# secretlint-config-nick2bad4u

Shared Secretlint config for Nick2bad4u projects.

## Install

```sh
npm install --save-dev secretlint secretlint-config-nick2bad4u
```

`secretlint` is a peer dependency so each consuming project controls the CLI version. This config package ships the Secretlint rule packages it enables.

## Usage

Create `.secretlintrc.cjs` in a consuming project:

```js
const sharedConfig = require("secretlint-config-nick2bad4u/secretlintrc.json");

/**
 * @type {import("@secretlint/types").SecretLintConfigDescriptor}
 */
const secretlintConfig = {
    ...sharedConfig,
    rules: [...sharedConfig.rules],
};

module.exports = secretlintConfig;
```

Use `.secretlintrc.cjs` here because Secretlint loads JavaScript config files
through a CommonJS-based rc loader. An ESM `.secretlintrc.js` with
`export default` will not be read correctly.

Run Secretlint with your project globs:

```sh
npx secretlint "**/*"
```

## Compose with local rules

Use the `rules` array when a project needs to append project-local Secretlint rules after the shared baseline:

```js
const sharedConfig = require("secretlint-config-nick2bad4u/secretlintrc.json");

/**
 * @type {import("@secretlint/types").SecretLintConfigDescriptor}
 */
const secretlintConfig = {
    ...sharedConfig,
    rules: [
        ...sharedConfig.rules,
        // { id: "@secretlint/secretlint-rule-pattern", options: {} }, // your override here
    ],
};

module.exports = secretlintConfig;
```

The package also exports `createConfig`, `defaultConfig`, and `rules` if you need lower-level composition helpers outside Secretlint's rc loader path.

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
