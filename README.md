# 🌌 LEIA Project - Website

This is the official repository of the **LEIA Project documentation and website**, built with [Docusaurus](https://docusaurus.io/).

---

## 📖 About LEIA

**LEIA** is a project focused on AI-assisted learning.
This website serves as the main hub for documentation, resources, and community updates.

---

## 🛠️ Prerequisites

Before you begin, make sure you have installed:

- [Node.js](https://nodejs.org/) 22 (also used in CI)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

---

## ▶️ Local Development

Clone this repository and run the website locally:

```bash
# Clone the repository
git clone https://github.com/leia-org/web.git
cd web

# Install dependencies
npm ci

# Start the development server
npm start
```

## CI/CD and pull request previews

Every pull request targeting `main` runs the deployment-script tests,
Markdown lint and a Docusaurus build. Successful builds are published at
`https://leia.ovh/pr-preview/pr-<number>/`. A single bot comment in the pull
request links to the documentation and website, identifies the commit and
updates after each deployment. Failed checks or deployments update that
same comment with a link to the logs.

The documentation link opens `/docs/next/`, which contains the PR's edits to
`docs/`; the version selector also includes the stable documentation snapshots.

Closing or merging a pull request removes its preview and updates the comment.
Pushes to `main` deploy production while preserving previews of open PRs.
Previews have `noindex` metadata and disable production Algolia search.

The repository must keep **Settings → Pages → Source: GitHub Actions**, with
the `github-pages` environment allowing deployments from `main` (the current
configuration). The workflow creates `gh-pages` as storage for compiled
production and preview files; do not switch Pages to branch-based publishing.
No additional secrets or hosting accounts are required.

The PR build has read-only permissions, including for forks. A separate
`workflow_run` deployment uses only scripts and production source from `main`
and copies the compiled PR artifact as static files. It checks the current
PR commit before publishing and commenting, so stale builds are ignored.
Cleanup uses `pull_request_target` only for the `closed` event and never
executes PR code.

**Activation:** merge these workflows into `main` first. GitHub only triggers
`workflow_run` workflows that exist on the default branch. For PRs already
open at activation, push a new commit or rerun their Documentation CI build.
The deployment workflow also supports a manual production run from Actions.

For the initial CI/CD PR, maintainers can publish a preview before merging:
run the deployment workflow from its reviewed repository branch and set
`preview_run_id` to the successful Documentation CI run for the current PR
commit. Temporarily allow that exact branch in the `github-pages` environment,
then remove that branch policy after deployment. Manual runs use deployment
scripts from the explicitly selected commit; automatic runs continue using
`main`. Production is always built from `main`.

```bash
gh workflow run deploy.yml --ref ci/docs-pr-previews -f preview_run_id=<ci-run-id>
```

To test a preview locally:

```bash
node --test .github/scripts/previews.test.cjs
npm run lint:md
DOCUSAURUS_BASE_URL=/pr-preview/pr-123/ DOCUSAURUS_PREVIEW=true npm run build
DOCUSAURUS_BASE_URL=/pr-preview/pr-123/ DOCUSAURUS_PREVIEW=true npm run serve
```

Open `http://localhost:3000/pr-preview/pr-123/docs/next/`. For a production build,
run `npm run build` without these environment variables.
