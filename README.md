# renovate-config

Self-hosted [Renovate](https://docs.renovatebot.com) for pgschk's
repositories, and the rules they share.

| File | What |
|---|---|
| `.github/workflows/renovate.yml` | Runs Renovate as the GitHub App, Friday 01:00–07:59 Berlin time, or by hand (Actions → renovate → Run workflow) |
| `config.js` | Global config: which repositories, commits through the App |
| `default.json` | Shared rules: schedule, 3-day release age, PR limits, digest pinning, branch automerge |
| `renovate.json` | This repo's own config (keeps the Actions and the Renovate version current) |
| `.github/workflows/validate.yml` | Checks the configs with `renovate-config-validator` |

A repository uses the shared rules with:

```json
{ "extends": ["github>pgschk"] }
```

Its own `renovate.json` decides what may merge itself. Renovate only
automerges when the repository's CI passes on the `renovate/**` branch.

## Setup

- GitHub App, installed on this repo and every repo in `config.js`, with
  repository permissions: Contents, Pull requests, Issues and Workflows
  read and write; Checks and Commit statuses read.
- Variable `RENOVATE_APP_CLIENT_ID`: the App's client ID.
- Secret `RENOVATE_APP_PRIVATE_KEY`: a private key of the App.
- Secret `RENOVATE_GHCR_TOKEN`: a classic personal access token with only
  `read:packages`, for the private images on ghcr.io. GitHub App tokens
  can't read GHCR.

## Adding a repository

1. Install the App on it.
2. Add it to `repositories` in `config.js` and to `repositories` of the
   App token step in `.github/workflows/renovate.yml`.
3. Commit a `renovate.json` there that extends `github>pgschk`; make its
   CI run on pushes to `renovate/**` if anything should automerge.
