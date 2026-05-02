import defaultConfig, {
    createConfig,
    defaultConfig as namedDefaultConfig,
    rules,
} from "secretlint-config-nick2bad4u";
import { describe, expect, it } from "vitest";

// eslint-disable-next-line import-x/extensions -- JSON module imports require the explicit .json extension.
import secretlintrc from "../.secretlintrc.json" with { type: "json" };

const expectedRuleIds = [
    "@secretlint/secretlint-rule-aws",
    "@secretlint/secretlint-rule-gcp",
    "@secretlint/secretlint-rule-github",
    "@secretlint/secretlint-rule-npm",
    "@secretlint/secretlint-rule-database-connection-string",
    "@secretlint/secretlint-rule-openai",
    "@secretlint/secretlint-rule-anthropic",
    "@secretlint/secretlint-rule-no-dotenv",
    "@secretlint/secretlint-rule-no-homedir",
    "@secretlint/secretlint-rule-privatekey",
    "@secretlint/secretlint-rule-pattern",
    "@secretlint/secretlint-rule-secp256k1-privatekey",
] as const;

describe("secretlint-config-nick2bad4u", () => {
    it("exports the repository Secretlint rules as the default config", () => {
        expect.assertions(4);

        expect(defaultConfig).toBe(namedDefaultConfig);
        expect(defaultConfig.rules).toStrictEqual(secretlintrc.rules);
        expect(rules).toStrictEqual(secretlintrc.rules);
        expect(rules.map((rule) => rule.id)).toStrictEqual(expectedRuleIds);
    });

    it("creates a fresh config object with appended project rules", () => {
        expect.assertions(3);

        const localRule = {
            id: "@secretlint/secretlint-rule-preset-recommend",
            rules: [],
        };
        const localConfig = createConfig({ rules: [localRule] });

        expect(localConfig).not.toBe(defaultConfig);
        expect(localConfig.rules).toHaveLength(rules.length + 1);
        expect(localConfig.rules.at(-1)).toStrictEqual(localRule);
    });

    it("does not mutate the shared rule array when composing config", () => {
        expect.assertions(2);

        const localConfig = createConfig();

        expect(localConfig.rules).toStrictEqual(rules);
        expect(localConfig.rules).not.toBe(rules);
    });
});
