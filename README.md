# robinbach.github.io

Personal project homepage, published at https://robinbach.github.io/.

## Contents

- `index.html`: project homepage.
- `rot/`: generated simulator files; update through the simulator build workflow.
- `.nojekyll`: serve static assets without Jekyll processing.

The simulator's source and development history live separately. This repository
contains its public browser build only. Do not edit generated files in `rot/`.

## Publishing

In GitHub **Settings → Pages**, select **Deploy from a branch**, branch **main**,
folder **/(root)**. Push this repository's main branch to publish the homepage
and the initial simulator build.

For automatic simulator updates:

1. Add a dedicated SSH public key under this repository's **Settings → Deploy
   keys**, with **Allow write access** enabled.
2. Store the corresponding private key as the source repository's Actions secret
   `PAGES_DEPLOY_KEY`. Never commit credentials or private source here.
3. Push the source repository's main branch, or run its **Publish simulator**
   workflow manually.

The workflow builds static files, replaces only `rot/`, and pushes a generic
`Update rot simulator` commit when the output changes. It preserves the homepage
and other projects. Direct writes must be allowed by any branch protection rules.

After automated updates, run `git pull --ff-only` before editing this checkout.

## Simulator URLs

- Current simulation: `/rot/chunks/`
- Single-piece experiment: `/rot/chunks/rind/`
- Earlier version: `/rot/`

GitHub Pages serves files only. Simulation, rendering, and physics run in the
visitor's browser; no application server is required.
