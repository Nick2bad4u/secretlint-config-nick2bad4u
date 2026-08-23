import defaultConfig, {
    defaultConfig as namedDefaultConfig,
    rules,
} from "secretlint-config-nick2bad4u";
import { describe, expect, it } from "vitest";

import secretlintrc from "../.secretlintrc.json" with { type: "json" };

const expectedRuleIds = [
    "@secretlint/secretlint-rule-anthropic",
    "@secretlint/secretlint-rule-aws",
    "@secretlint/secretlint-rule-basicauth",
    "@secretlint/secretlint-rule-database-connection-string",
    "@secretlint/secretlint-rule-filter-comments",
    "@secretlint/secretlint-rule-gcp",
    "@secretlint/secretlint-rule-github",
    "@secretlint/secretlint-rule-no-dotenv",
    "@secretlint/secretlint-rule-no-homedir",
    "@secretlint/secretlint-rule-npm",
    "@secretlint/secretlint-rule-openai",
    "@secretlint/secretlint-rule-pattern",
    "@secretlint/secretlint-rule-privatekey",
] as const;

describe("secretlint-config-nick2bad4u", () => {
    it("exports the repository Secretlint rules as the default config", () => {
        expect.assertions(5);

        expect(defaultConfig).toBe(namedDefaultConfig);
        expect(defaultConfig.rules).not.toBe(rules);
        expect(defaultConfig.rules).toStrictEqual(secretlintrc.rules);
        expect(rules).toStrictEqual(secretlintrc.rules);
        expect(
            rules
                .map((rule) => rule.id)
                .toSorted((left, right) => left.localeCompare(right))
        ).toStrictEqual(expectedRuleIds);
    });
});
