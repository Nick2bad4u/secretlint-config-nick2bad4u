## Template conversion notes

This repository was converted from the shared ESLint config template into `secretlint-config-nick2bad4u`.

The root `eslint.config.mjs` now only dogfoods the external `eslint-config-nick2bad4u` package for repository linting. The package entrypoint is `preset.mjs`, which exports the shared Secretlint config descriptor sourced from `.secretlintrc.json`.
