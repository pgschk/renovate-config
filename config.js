// Global config of the self-hosted Renovate (.github/workflows/renovate.yml):
// only what a repository can't set for itself. The shared rules every repo
// extends are in default.json; each repo's own rules in its renovate.json.
module.exports = {
  platform: 'github',
  // Add a repo here, give it a renovate.json that extends "github>pgschk",
  // and add it to the App token's repositories in the workflow.
  repositories: ['pgschk/renovate-config', 'pgschk/k3s-gitops'],
  // Repos get their renovate.json by hand, so no onboarding PRs, and a repo
  // without one is left alone.
  onboarding: false,
  requireConfig: 'required',
  // As a GitHub App, commit through GitHub's API: commits are signed and
  // attributed to the App.
  platformCommit: 'enabled',
  // The ghcr.io credentials come from RENOVATE_HOST_RULES in the workflow.
};
