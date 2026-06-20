import sharedConfigDescriptor from "./.secretlintrc.json" with { type: "json" };

/**
 * @typedef {import("@secretlint/types").SecretLintConfigDescriptor} SecretLintConfigDescriptor
 */

/**
 * Rule descriptors shipped by the shared Nick2bad4u Secretlint config.
 *
 * @type {SecretLintConfigDescriptor["rules"]}
 */
export const rules = [...sharedConfigDescriptor.rules];

/**
 * Create a Secretlint config descriptor, optionally appending project-local
 * rules after the shared rules.
 *
 * @param {Readonly<{
 *     readonly rules?: SecretLintConfigDescriptor["rules"];
 * }>} [options]
 *
 * @returns {SecretLintConfigDescriptor}
 */

export function createConfig(options = {}) {
    return {
        rules: [...rules, ...(options.rules ?? [])],
    };
}

/** @type {SecretLintConfigDescriptor} */
export const defaultConfig = createConfig();

export default defaultConfig;
