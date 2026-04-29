# Plant Store Docs - Helpful Notes

This repository contains the documentation site for the Plant Store demo. The site is built with Fern and includes a custom landing page, API reference, webhook documentation, and runnable API examples.

## Getting Started

Install the Fern CLI if you do not already have it:

```bash
npm install -g fern-api
```

Then start from the Fern project folder:

```bash
cd fern
fern check --warnings
fern docs dev
```

`fern docs dev` starts a local preview so you can make changes and quickly check them in the browser.

## Publishing The Site

Published docs site:

```text
https://shridhar-sinha-demo.docs.buildwithfern.com
```

Last production publish: April 29, 2026.

To publish the production docs site, run:

```bash
cd fern
fern generate --docs
```

Fern will ask for confirmation before publishing to production.

To create a hosted preview without affecting the production site, run:

```bash
cd fern
fern generate --docs --preview
```

## Where To Make Changes

The main docs configuration lives in `fern/docs.yml`. This controls the site title, navigation, search behavior, theme settings, custom CSS, and custom JavaScript.

The homepage content lives in `fern/docs/pages/landingpage.mdx`.

The API reference is generated from `fern/openapi/api.yml`. Update this file when changing endpoints, request/response examples, webhook payloads, or API environments.

Shared styling lives in `fern/docs/assets/main.css`.

Image assets live in `fern/docs/assets`.

## API Environments

The API reference includes both production and sandbox environments:

```text
Production: https://api.plantstore.prod
Sandbox:    https://api.plantstore.dev
```

You can see these options in the API Explorer when trying an endpoint.

## Notes For Maintainers

There is a small `fern/custom.js` file that keeps the generated site aligned with the demo behavior. It also works around a Windows-specific preview issue where local image paths can be rendered as filesystem paths instead of web URLs.

Before sharing or publishing changes, run:

```bash
cd fern
fern check --warnings
fern generate --docs
```

If both commands pass and the hosted site looks correct, the project is ready to hand off.
