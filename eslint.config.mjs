import { createConfig } from "eslint-config-nick2bad4u";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line unicorn/prefer-import-meta-properties -- package.json supports Node >=22.0.0, while import.meta.dirname requires newer Node 22 releases.
const rootDirectory = path.dirname(fileURLToPath(import.meta.url));

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = createConfig({
    rootDirectory,
    tsconfigPaths: [
        "./tsconfig.eslint.json",
        "./tsconfig.json",
        "./tsconfig.js.json",
        "./tsconfig.vitest-typecheck.json",
    ],
});

export default eslintConfig;
