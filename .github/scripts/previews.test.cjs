const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { resolve, prepare, comment } = require('./previews.cjs');

const sha = 'abcdef0123456789';
const pr = { number: 12, state: 'open', head: { sha } };
const context = { repo: { owner: 'leia-org', repo: 'web' }, serverUrl: 'https://github.com', runId: 100 };
const env = {
  PREVIEW_ACTION: 'preview', PREVIEW_PR: '12', PREVIEW_SHA: sha,
  PREVIEW_RUN_ID: '99', DEPLOY_RESULT: 'success',
  PREVIEW_PUBLISHED: 'true', PAGES_URL: 'https://leia.ovh/',
};

function fixture(prs = [pr], comments = []) {
  const outputs = {};
  const writes = [];
  const core = { setOutput: (key, value) => { outputs[key] = value; }, info() {} };
  const github = {
    rest: {
      pulls: { list: 'pulls', get: async () => ({ data: prs[0] }) },
      issues: {
        listComments: 'comments',
        createComment: async (args) => writes.push({ type: 'create', ...args }),
        updateComment: async (args) => writes.push({ type: 'update', ...args }),
      },
    },
    paginate: async (method) => method === 'pulls' ? prs : comments,
  };
  return { github, core, outputs, writes, context };
}

function runContext(overrides = {}) {
  return { ...context, eventName: 'workflow_run', payload: { workflow_run: {
    id: 99, event: 'pull_request', path: '.github/workflows/ci.yml',
    head_sha: sha, conclusion: 'success', ...overrides,
  } } };
}

async function site(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'leia-preview-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  await fs.mkdir(path.join(root, 'site', 'pr-preview', 'pr-12'), { recursive: true });
  await fs.mkdir(path.join(root, 'site', 'pr-preview', 'pr-13'));
  await fs.writeFile(path.join(root, 'site', 'index.html'), 'production');
  await fs.writeFile(path.join(root, 'site', 'pr-preview', 'pr-12', 'obsolete.html'), 'old');
  await fs.mkdir(path.join(root, 'incoming', 'assets'), { recursive: true });
  await fs.writeFile(path.join(root, 'incoming', 'index.html'), 'preview');
  return root;
}

test('successful CI resolves the current PR and exact artifact run', async () => {
  const f = fixture();
  await resolve({ ...f, context: runContext() });
  assert.deepEqual(f.outputs, { action: 'preview', pr: 12, sha, 'run-id': 99 });
});

test('superseded, closed, cancelled and unrelated builds are skipped', async () => {
  for (const [prs, run] of [
    [[pr], { head_sha: 'old-sha' }], [[], {}], [[pr], { conclusion: 'cancelled' }],
    [[pr], { event: 'push' }], [[pr], { path: '.github/workflows/unrelated.yml' }],
  ]) {
    const f = fixture(prs);
    await resolve({ ...f, context: runContext(run) });
    assert.equal(f.outputs.action, 'skip');
  }
});

test('failed CI reports without deploying and close selects cleanup', async () => {
  const f = fixture();
  await resolve({ ...f, context: runContext({ conclusion: 'failure' }) });
  assert.equal(f.outputs.action, 'failure');
  await comment({ ...f, env: { ...env, PREVIEW_ACTION: 'failure', DEPLOY_RESULT: 'skipped' } });
  assert.match(f.writes[0].body, /checks failed/);
  assert.match(f.writes[0].body, /actions\/runs\/99/);
  assert.doesNotMatch(f.writes[0].body, /preview ready/);
  await resolve({ ...f, context: { ...context, eventName: 'pull_request_target',
    payload: { action: 'closed', pull_request: { ...pr, state: 'closed' } },
  } });
  assert.equal(f.outputs.action, 'remove');
});

test('preview updates remove old files and closed previews, preserving production and other open PRs', async (t) => {
  const root = await site(t);
  await fs.mkdir(path.join(root, 'site', 'pr-preview', 'pr-14'));
  await fs.writeFile(path.join(root, 'site', 'pr-preview', 'pr-14', 'index.html'), 'another preview');
  const f = fixture([pr, { number: 14, head: { sha: 'other' } }]);
  await prepare({ ...f, env, root });
  assert.equal(f.outputs.publish, 'true');
  assert.equal(await fs.readFile(path.join(root, 'site', 'index.html'), 'utf8'), 'production');
  assert.equal(await fs.readFile(path.join(root, 'site', 'pr-preview', 'pr-12', 'index.html'), 'utf8'), 'preview');
  assert.equal(await fs.readFile(path.join(root, 'site', 'pr-preview', 'pr-14', 'index.html'), 'utf8'), 'another preview');
  await assert.rejects(fs.stat(path.join(root, 'site', 'pr-preview', 'pr-12', 'obsolete.html')), { code: 'ENOENT' });
  await assert.rejects(fs.stat(path.join(root, 'site', 'pr-preview', 'pr-13')), { code: 'ENOENT' });
});

test('production preserves open previews and cleanup removes closed previews', async (t) => {
  const root = await site(t);
  await prepare({ ...fixture(), env: { ...env, PREVIEW_ACTION: 'production' }, root });
  assert.equal(await fs.readFile(path.join(root, 'site', 'pr-preview', 'pr-12', 'obsolete.html'), 'utf8'), 'old');
  await prepare({ ...fixture([]), env: { ...env, PREVIEW_ACTION: 'remove' }, root });
  assert.deepEqual(await fs.readdir(path.join(root, 'site', 'pr-preview')), []);
  assert.equal(await fs.readFile(path.join(root, 'site', 'index.html'), 'utf8'), 'production');
});

test('changed, closed or reopened PRs prevent a stale deployment', async (t) => {
  const root = await site(t);
  for (const [prs, action] of [
    [[{ ...pr, head: { sha: 'new' } }], 'preview'], [[], 'preview'], [[pr], 'remove'],
  ]) {
    const f = fixture(prs);
    await prepare({ ...f, env: { ...env, PREVIEW_ACTION: action }, root });
    assert.equal(f.outputs.publish, 'false');
    assert.equal(await fs.readFile(path.join(root, 'site', 'pr-preview', 'pr-12', 'obsolete.html'), 'utf8'), 'old');
  }
});

test('untrusted symlinks, Git directories and missing entry point are rejected', async (t) => {
  const root = await site(t);
  const link = path.join(root, 'incoming', 'escape');
  await fs.symlink(path.join(root, 'site', 'index.html'), link);
  await assert.rejects(prepare({ ...fixture(), env, root }), /Unsafe preview entry/);
  await fs.unlink(link);
  const git = path.join(root, 'incoming', 'assets', '.git');
  await fs.mkdir(git);
  await assert.rejects(prepare({ ...fixture(), env, root }), /Unsafe preview entry/);
  await fs.rmdir(git);
  await fs.unlink(path.join(root, 'incoming', 'index.html'));
  await assert.rejects(prepare({ ...fixture(), env, root }), { code: 'ENOENT' });
});

test('comment uses the deployed custom domain and updates only the bot comment', async () => {
  const f = fixture([pr], [
    { id: 1, user: { login: 'someone' }, body: '<!-- leia-docs-preview --> impersonation' },
    { id: 2, user: { login: 'github-actions[bot]' }, body: '<!-- leia-docs-preview --> old' },
  ]);
  await comment({ ...f, env });
  assert.equal(f.writes.length, 1);
  assert.equal(f.writes[0].type, 'update');
  assert.equal(f.writes[0].comment_id, 2);
  assert.match(f.writes[0].body, /https:\/\/leia.ovh\/pr-preview\/pr-12\/docs\/next\//);
});

test('late comments and reopened cleanup are ignored; deployment failures and cleanup are reported', async () => {
  for (const [prs, settings] of [
    [[{ ...pr, head: { sha: 'new' } }], env], [[{ ...pr, state: 'closed' }], env],
    [[pr], { ...env, PREVIEW_ACTION: 'remove' }], [[pr], { ...env, PREVIEW_PUBLISHED: 'false' }],
  ]) {
    const f = fixture(prs);
    await comment({ ...f, env: settings });
    assert.equal(f.writes.length, 0);
  }
  const failed = fixture();
  await comment({ ...failed, env: { ...env, DEPLOY_RESULT: 'failure' } });
  assert.match(failed.writes[0].body, /deployment failed/);
  const closed = fixture([{ ...pr, state: 'closed' }]);
  await comment({ ...closed, env: { ...env, PREVIEW_ACTION: 'remove' } });
  assert.match(closed.writes[0].body, /preview removed/);
});

test('manual bootstrap downloads only a successful current Documentation CI artifact', async () => {
  const f = fixture();
  const run = { ...runContext().payload.workflow_run, status: 'completed', pull_requests: [{ number: 12 }] };
  f.github.rest.actions = { getWorkflowRun: async () => ({ data: run }) };
  const manual = { ...context, eventName: 'workflow_dispatch', payload: { inputs: { preview_run_id: '99' } } };
  await resolve({ ...f, context: manual });
  assert.deepEqual(f.outputs, { action: 'preview', pr: 12, sha, 'run-id': 99 });
  run.pull_requests = [{ number: 999 }];
  await resolve({ ...f, context: manual });
  assert.equal(f.outputs.action, 'skip');
  run.conclusion = 'failure';
  await assert.rejects(resolve({ ...f, context: manual }), /completed, successful/);
  manual.payload.inputs.preview_run_id = '../evil';
  await assert.rejects(resolve({ ...f, context: manual }), /Invalid CI run ID/);
});
