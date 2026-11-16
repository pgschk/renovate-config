// Global config of the self-hosted Renovate (.github/workflows/renovate.yml):
// only what a repository can't set for itself. The shared rules every repo
// extends are in default.json; each repo's own rules in its renovate.json.
module.exports = {
  platform: 'github',
  // Every repo the App is installed on; installing the App decides which.
  autodiscover: true,
  // Repos get their renovate.json by hand, so no onboarding PRs, and a repo
  // without one is left alone.
  onboarding: false,
  requireConfig: 'required',
  // As a GitHub App, commit through GitHub's API: commits are signed and
  // attributed to the App.
  platformCommit: 'enabled',
  // The ghcr.io credentials come from RENOVATE_HOST_RULES in the workflow.
};
