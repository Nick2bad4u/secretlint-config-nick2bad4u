Use this from each consuming repo root.

## 1. Uninstall Secretlint rule deps now handled by shared config

```powershell
npm uninstall --save-dev `
  @secretlint/secretlint-rule-anthropic `
  @secretlint/secretlint-rule-aws `
  @secretlint/secretlint-rule-database-connection-string `
  @secretlint/secretlint-rule-gcp `
  @secretlint/secretlint-rule-github `
  @secretlint/secretlint-rule-no-dotenv `
  @secretlint/secretlint-rule-no-homedir `
  @secretlint/secretlint-rule-npm `
  @secretlint/secretlint-rule-openai `
  @secretlint/secretlint-rule-pattern `
  @secretlint/secretlint-rule-preset-recommend `
  @secretlint/secretlint-rule-privatekey `
  @secretlint/secretlint-rule-secp256k1-privatekey `
  @secretlint/types
```

Do **not** uninstall `secretlint` itself. Your shared config has `secretlint` as a peer dependency, so consuming repos still need it installed.

## 2. Install shared config

If the package is already published:

```powershell
npm install --save-dev secretlint secretlint-config-nick2bad4u
```

If testing locally before publish:

```powershell
npm install --save-dev secretlint "file:../secretlint-config-nick2bad4u"
```

Adjust the relative path if needed.

## 3. Replace local Secretlint config with shared import

Secretlint's JS config loader is CommonJS-based, so create/overwrite
`.secretlintrc.cjs` instead of using an ESM `.secretlintrc.js` file:

```powershell
@'
/*
 * This is the Secretlint configuration file for the project.
 */
const sharedConfig = require("secretlint-config-nick2bad4u/secretlintrc.json");

/**
 * @type {import("@secretlint/types").SecretLintConfigDescriptor}
 */
const secretlintConfig = {
    ...sharedConfig,
    rules: [
        ...sharedConfig.rules,
        // Add project-specific Secretlint rules here.
    ],
};

module.exports = secretlintConfig;

'@ | Set-Content -Path ".secretlintrc.cjs" -Encoding utf8
```

Then remove the old JSON config if present:

```powershell
Remove-Item ".secretlintrc.json" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yaml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.js" -ErrorAction SilentlyContinue
```

## 4. Optional: compose local extra rules

If a repo needs extra project-local rules or local overrides, use the `rules`
array as the override point:

```powershell
@'
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
'@ | Set-Content -Path ".secretlintrc.cjs" -Encoding utf8
```

## 5. Verify

```powershell
npm run lint:secretlint
```

If the repo does not have that script:

```powershell
npx secretlint --secretlintrc .secretlintrc.cjs --secretlintignore .gitignore "**/*"
```

## One-shot migration block

```powershell
npm uninstall --save-dev --force `
  @secretlint/secretlint-rule-anthropic `
  @secretlint/secretlint-rule-aws `
  @secretlint/secretlint-rule-database-connection-string `
  @secretlint/secretlint-rule-gcp `
  @secretlint/secretlint-rule-github `
  @secretlint/secretlint-rule-no-dotenv `
  @secretlint/secretlint-rule-no-homedir `
  @secretlint/secretlint-rule-npm `
  @secretlint/secretlint-rule-openai `
  @secretlint/secretlint-rule-pattern `
  @secretlint/secretlint-rule-preset-recommend `
  @secretlint/secretlint-rule-privatekey `
  @secretlint/secretlint-rule-secp256k1-privatekey `
  @secretlint/types

npm install --save-dev secretlint secretlint-config-nick2bad4u --force

@'
/*
 * This is the Secretlint configuration file for the project.
 */
const sharedConfig = require("secretlint-config-nick2bad4u/secretlintrc.json");

/**
 * @type {import("@secretlint/types").SecretLintConfigDescriptor}
 */
const secretlintConfig = {
    ...sharedConfig,
    rules: [
        ...sharedConfig.rules,
        // Add project-specific Secretlint rules here.
    ],
};

module.exports = secretlintConfig;

'@ | Set-Content -Path ".secretlintrc.cjs" -Encoding utf8

Remove-Item ".secretlintrc.json" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yaml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.js" -ErrorAction SilentlyContinue

# # Replace scripts with new config location

$old = '.secretlintrc.json'
$new = '.secretlintrc.cjs'

$package = Get-Content .\package.json -Raw | ConvertFrom-Json -AsHashtable

foreach ($scriptName in @($package.scripts.Keys)) {
    $package.scripts[$scriptName] = $package.scripts[$scriptName].Replace($old, $new)
}

$package | ConvertTo-Json -Depth 100 | Set-Content .\package.json
npm run lint:package:fix
npm run lint:prettier -- package.json --write

npx secretlint --secretlintrc .secretlintrc.cjs --secretlintignore .gitignore "**/*"
```
