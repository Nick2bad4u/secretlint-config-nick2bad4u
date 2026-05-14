// eslint-disable-next-line import-x/extensions -- JSON module imports require the explicit .json extension.
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
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types -- This module is JavaScript; the public signature is expressed through JSDoc for checked JS consumers.
export function createConfig(options = {}) {
    return {
        rules: [...rules, ...(options.rules ?? [])],
    };
}

/** @type {SecretLintConfigDescriptor} */
export const defaultConfig = createConfig();

export default defaultConfig;
