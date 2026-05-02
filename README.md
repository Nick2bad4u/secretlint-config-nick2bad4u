# secretlint-config-nick2bad4u

Shared Secretlint config for Nick2bad4u projects.

## Install

```sh
npm install --save-dev secretlint secretlint-config-nick2bad4u
```

`secretlint` is a peer dependency so each consuming project controls the CLI version. This config package ships the Secretlint rule packages it enables.

## Usage

Create `.secretlintrc.js` in a consuming project:

```js
import sharedConfig from "secretlint-config-nick2bad4u";

export default sharedConfig;
```

Run Secretlint with your project globs:

```sh
npx secretlint "**/*"
```

## Compose with local rules

Use `createConfig` when a project needs to append project-local Secretlint rules after the shared baseline:

```js
import { createConfig } from "secretlint-config-nick2bad4u";

export default createConfig({
    rules: [
        {
            id: "@secretlint/secretlint-rule-preset-recommend",
            rules: [],
        },
    ],
});
```

The package also exports `rules` if a consumer needs to inspect or compose the raw rule descriptors.

Using a neutral local name like `sharedConfig` avoids `import-x/no-named-as-default`
noise in repos that enable that rule.

## Enabled rule packages

The shared config currently enables:

- `@secretlint/secretlint-rule-anthropic`
- `@secretlint/secretlint-rule-aws`
- `@secretlint/secretlint-rule-database-connection-string`
- `@secretlint/secretlint-rule-gcp`
- `@secretlint/secretlint-rule-github`
- `@secretlint/secretlint-rule-no-dotenv`
- `@secretlint/secretlint-rule-no-homedir`
- `@secretlint/secretlint-rule-npm`
- `@secretlint/secretlint-rule-openai`
- `@secretlint/secretlint-rule-pattern`
- `@secretlint/secretlint-rule-privatekey`
- `@secretlint/secretlint-rule-secp256k1-privatekey`

`@secretlint/secretlint-rule-preset-recommend` is installed with the package for consumers that want to append the recommended preset explicitly. It is not enabled by default because the shared config already configures several overlapping rules with project-safe example allowlists; enabling both would create duplicate reports and bypass those allowlists.

## Development checks

Use the aggregate scripts before publishing or opening a pull request:

```sh
npm run lint:all
npm run release:verify
```

The release verification pipeline runs typechecking, Vitest tests, ESLint, Prettier, package sorting/linting, `publint`, ATTW in ESM-only mode, YAML lint, and Secretlint.

For maintainers, see [MAINTAINER_GUIDE.md](./MAINTAINER_GUIDE.md).
