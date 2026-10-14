const fs = require('node:fs/promises');
const path = require('node:path');

const marker = '<!-- leia-docs-preview -->';

async function openPullRequests(github, context) {
  return github.paginate(github.rest.pulls.list, {
    ...context.repo, state: 'open', base: 'main', per_page: 100,
  });
}

async function resolve({ github, context, core }) {
  let action = 'production';
  let pr;
  let run;
  if (context.eventName === 'workflow_run') {
    run = context.payload.workflow_run;
    if (run.event !== 'pull_request' || run.path !== '.github/workflows/ci.yml') {
      core.setOutput('action', 'skip');
      return;
    }
    // Derive identity from GitHub, never from a file supplied by the PR.
    const prs = await openPullRequests(github, context);
    pr = prs.find(candidate => candidate.head.sha === run.head_sha);
    if (!pr) {
      core.info('Ignoring a closed or superseded pull request build.');
      core.setOutput('action', 'skip');
      return;
    }
    if (run.conclusion === 'success') action = 'preview';
    else if (run.conclusion === 'failure' || run.conclusion === 'timed_out') action = 'failure';
    else action = 'skip';
  } else if (context.eventName === 'pull_request_target') {
    if (context.payload.action !== 'closed') {
      core.setOutput('action', 'skip');
      return;
    }
    pr = context.payload.pull_request;
    action = 'remove';
  }
  core.setOutput('action', action);
  core.setOutput('pr', pr?.number ?? '');
  core.setOutput('sha', pr?.head.sha ?? '');
  core.setOutput('run-id', run?.id ?? '');
}

async function assertStaticTree(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (entry.isSymbolicLink() || (!entry.isDirectory() && !entry.isFile()) || entry.name === '.git') {
      throw new Error(`Unsafe preview entry: ${entry.name}`);
    }
    if (entry.isDirectory()) await assertStaticTree(path.join(directory, entry.name));
  }
}

async function prepare({ github, context, core, env = process.env, root = process.cwd() }) {
  const prs = await openPullRequests(github, context);
  const number = Number(env.PREVIEW_PR);
  const action = env.PREVIEW_ACTION;
  if (action === 'preview' && !prs.some(pr => pr.number === number && pr.head.sha === env.PREVIEW_SHA)) {
    core.info('The pull request changed or closed while production was building.');
    core.setOutput('publish', 'false');
    return;
  }
  if (action === 'remove' && prs.some(pr => pr.number === number)) {
    core.info('The pull request was reopened before cleanup.');
    core.setOutput('publish', 'false');
    return;
  }

  const previews = path.join(root, 'site', 'pr-preview');
  await fs.mkdir(previews, { recursive: true });
  const open = new Set(prs.map(pr => `pr-${pr.number}`));
  for (const entry of await fs.readdir(previews)) {
    if (!open.has(entry)) await fs.rm(path.join(previews, entry), { recursive: true, force: true });
  }
  if (action === 'preview') {
    if (!Number.isSafeInteger(number) || number <= 0) throw new Error('Invalid pull request number');
    const incoming = path.join(root, 'incoming');
    await assertStaticTree(incoming);
    const index = await fs.stat(path.join(incoming, 'index.html'));
    if (!index.isFile()) throw new Error('Preview has no index.html');
    const destination = path.join(previews, `pr-${number}`);
    await fs.rm(destination, { recursive: true, force: true });
    await fs.cp(incoming, destination, { recursive: true });
  }
  core.setOutput('publish', 'true');
}

async function comment({ github, context, env = process.env }) {
  const number = Number(env.PREVIEW_PR);
  if (!Number.isSafeInteger(number) || number <= 0) throw new Error('Invalid pull request number');
  const { data: pr } = await github.rest.pulls.get({ ...context.repo, pull_number: number });
  const removing = env.PREVIEW_ACTION === 'remove';
  // A late deployment must not overwrite the comment for a newer commit/reopen.
  if (removing ? pr.state !== 'closed' : pr.state !== 'open' || pr.head.sha !== env.PREVIEW_SHA) return;
  if (env.DEPLOY_RESULT === 'success' && env.PREVIEW_PUBLISHED !== 'true') return;

  const deployed = env.DEPLOY_RESULT === 'success' && env.PREVIEW_PUBLISHED === 'true';
  const deploymentRun = `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId}`;
  const ciRun = env.PREVIEW_RUN_ID
    ? `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${env.PREVIEW_RUN_ID}`
    : deploymentRun;
  let message;
  if (env.PREVIEW_ACTION === 'failure') {
    message = `❌ Documentation checks failed for \`${env.PREVIEW_SHA.slice(0, 7)}\`.\n\n[View CI logs](${ciRun}). The preview was not updated.`;
  } else if (!deployed) {
    message = `❌ Documentation preview ${removing ? 'cleanup' : 'deployment'} failed.\n\n[View deployment logs](${deploymentRun}).`;
  } else if (removing) {
    message = `🧹 Documentation preview removed because this pull request is closed.\n\n[View deployment](${deploymentRun}).`;
  } else {
    const base = env.PAGES_URL.endsWith('/') ? env.PAGES_URL : `${env.PAGES_URL}/`;
    const previewUrl = `${base}pr-preview/pr-${number}/`;
    message = `✅ Documentation preview ready\n\n[Open documentation preview](${previewUrl}docs/next/) · [Open website](${previewUrl})\n\nCommit: \`${env.PREVIEW_SHA.slice(0, 7)}\` · [CI](${ciRun}) · [Deployment](${deploymentRun})\n\nThis preview updates with each commit and is removed when the pull request closes.`;
  }
  const body = `${marker}\n${message}`;
  const comments = await github.paginate(github.rest.issues.listComments, {
    ...context.repo, issue_number: number, per_page: 100,
  });
  const existing = comments.find(item => item.user?.login === 'github-actions[bot]' && item.body?.startsWith(marker));
  if (existing) {
    await github.rest.issues.updateComment({ ...context.repo, comment_id: existing.id, body });
  } else {
    await github.rest.issues.createComment({ ...context.repo, issue_number: number, body });
  }
}

module.exports = { resolve, prepare, comment };
