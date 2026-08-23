// Copyright (c) 2026 Nick2bad4u

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import secretlintrc from "./.secretlintrc.json" with { type: "json" };
import defaultConfig, { createConfig, rules } from "./preset.mjs";

void describe("preset runtime", () => {
    void it("uses a fresh copy of the repository rule descriptors", () => {
        assert.deepStrictEqual(rules, secretlintrc.rules);
        assert.deepStrictEqual(defaultConfig.rules, rules);
        assert.notStrictEqual(defaultConfig.rules, rules);
    });

    void it("appends project rules without mutating the shared rule array", () => {
        const localRule = {
            id: "@secretlint/secretlint-rule-preset-recommend",
            rules: [],
        };
        const localConfig = createConfig({ rules: [localRule] });

        assert.notStrictEqual(localConfig, defaultConfig);
        assert.equal(localConfig.rules.length, rules.length + 1);
        assert.deepStrictEqual(localConfig.rules.at(-1), localRule);
        assert.deepStrictEqual(rules, secretlintrc.rules);
    });

    void it("returns a fresh rule array for the default composition", () => {
        const localConfig = createConfig();

        assert.deepStrictEqual(localConfig.rules, rules);
        assert.notStrictEqual(localConfig.rules, rules);
    });
});
