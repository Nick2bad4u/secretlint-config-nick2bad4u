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

For ESM repos, create/overwrite `.secretlintrc.js`:

```powershell
@'
import sharedConfig from "secretlint-config-nick2bad4u";

export default sharedConfig;
'@ | Set-Content -Path ".secretlintrc.js" -Encoding utf8
```

Then remove the old JSON config if present:

```powershell
Remove-Item ".secretlintrc.json" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yaml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yml" -ErrorAction SilentlyContinue
```

## 4. Optional: compose local extra rules

If a repo needs extra project-local rules:

```powershell
@'
import { createConfig } from "secretlint-config-nick2bad4u";

export default createConfig({
    rules: [
        // Add project-specific Secretlint rules here.
    ],
});
'@ | Set-Content -Path ".secretlintrc.js" -Encoding utf8
```

## 5. Verify

```powershell
npm run lint:secretlint
```

If the repo does not have that script:

```powershell
npx secretlint --secretlintrc .secretlintrc.js --secretlintignore .gitignore "**/*"
```

## One-shot migration block

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

npm install --save-dev secretlint secretlint-config-nick2bad4u

@'
import sharedConfig from "secretlint-config-nick2bad4u";

export default sharedConfig;
'@ | Set-Content -Path ".secretlintrc.js" -Encoding utf8

Remove-Item ".secretlintrc.json" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yaml" -ErrorAction SilentlyContinue
Remove-Item ".secretlintrc.yml" -ErrorAction SilentlyContinue

npx secretlint --secretlintrc .secretlintrc.js --secretlintignore .gitignore "**/*"
```
