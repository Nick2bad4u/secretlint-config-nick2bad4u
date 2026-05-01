## Maintainer guide: Secretlint rules and package validation

### 1) Add or edit Secretlint rules

1. Open `.secretlintrc.json`.
2. Add or update the relevant rule descriptor in the top-level `rules` array.
3. Keep example allowlists narrow and obviously fake.
4. Update `README.md` when the enabled rule-package list or consumer behavior changes.
5. Update `test/preset.test.ts` when rule IDs or exported API behavior changes.

### 2) Add a new Secretlint rule package

1. Add the rule package to `dependencies` in `package.json` so consumers receive it with this shared config.
2. Add the rule descriptor to `.secretlintrc.json`.
3. Add a focused test assertion for the new rule ID in `test/preset.test.ts`.
4. Document the rule in `README.md`.

### 3) Validate the package

Run before pushing:

```sh
npm run lint:all
npm run release:verify
```

Optional release notes preview:

```sh
npm run changelog:preview
```

If `git-cliff` reports missing refs locally, ensure your local branch has at least one commit and tracks the expected branch ref.
