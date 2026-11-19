# renovate-config

Self-hosted [Renovate](https://docs.renovatebot.com) for the repositories of
pgschk and the ElectricDynamite org, and the rules they share. This repo is
public so that repos of every account can extend its presets.

| File | What |
|---|---|
| `.github/workflows/renovate.yml` | Runs Renovate as the GitHub App, one job per account: hourly in the Friday window, twice daily (04:00 and 16:00 UTC), or by hand (Actions → renovate → Run workflow) |
| `config.js` | Global config: autodiscovers the App's repos, opens onboarding PRs, commits through the App |
| `default.json` | Shared rules: Friday 01:00–07:59 Berlin schedule, 3-day release age, PR limits, digest pinning, branch automerge |
| `fast.json` | For software repos: updates at any time, PR automerge, base image digests without release age |
| `renovate.json` | This repo's own config (keeps the Actions and the Renovate version current) |
| `.github/workflows/validate.yml` | Checks the configs with `renovate-config-validator` |

A repository uses the shared rules with:

```json
{ "extends": ["github>pgschk/renovate-config"] }
```

Its own `renovate.json` decides what may merge itself. Renovate only
automerges when the repository's CI passes on the `renovate/**` branch.

A software repo that should get updates, security fixes especially, without
waiting for Friday adds the `fast` preset after the shared rules:

```json
{ "extends": ["github>pgschk/renovate-config", "github>pgschk/renovate-config:fast"] }
```

It runs in the twice-daily runs, and automerges through PRs, so its usual PR
CI is the gate and it needs no CI on `renovate/**`.

Security updates from vulnerability alerts ignore the schedule and the
release age in every repo. They need Dependabot alerts turned on in the repo
and the App's "Dependabot alerts: read" permission.

## Setup

- GitHub App, installable on any account, installed on this repo and every
  repo Renovate should handle, in pgschk and in ElectricDynamite, with
  repository permissions:
  - Contents, Pull requests, Issues, Workflows and Commit statuses: read
    and write. Renovate sets its own statuses (e.g. `renovate/stability-days`)
    on its branches and stops a repo with a 403 without them.
  - Checks: read.
  - Dependabot alerts: read, for security updates from vulnerability alerts.

  After changing the App's permissions, accept them on its installation.
- Variable `RENOVATE_APP_CLIENT_ID`: the App's client ID.
- Secret `RENOVATE_APP_PRIVATE_KEY`: a private key of the App.
- Secret `RENOVATE_GHCR_TOKEN`: a classic personal access token with only
  `read:packages`, for the private images on ghcr.io (pgschk's, and the
  org's that pgschk can read). GitHub App tokens can't read GHCR.

Another account gets Renovate by installing the App there and adding the
account to `matrix.owner` in `renovate.yml`.

## Adding a repository

1. Install the App on it. Renovate works on every repo the App is installed
   on; in the next run, one without a `renovate.json` gets a "Configure
   Renovate" PR and nothing else until that PR is merged.
2. Review the onboarding PR: its `renovate.json` extends
   `github>pgschk/renovate-config` (there's no shorter form). Add the `fast`
   preset or the repo's own automerge rules there before merging, and make
   its CI run on pushes to `renovate/**` if anything should automerge
   through branches. Closing the PR without merging leaves the repo alone.
