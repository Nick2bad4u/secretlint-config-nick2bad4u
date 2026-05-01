// eslint-disable-next-line import-x/extensions -- JSON module imports require the explicit .json extension.
import sharedConfigDescriptor from "./.secretlintrc.json" with { type: "json" };

/**
 * @import {SecretLintConfigDescriptor} from "@secretlint/types"
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
 * @type {(
 *     options?: Readonly<{
 *         readonly rules?: SecretLintConfigDescriptor["rules"];
 *     }>
 * ) => SecretLintConfigDescriptor}
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types -- The JSDoc @type above is the public signature for this checked JavaScript module.
export const createConfig = (options = {}) => ({
    rules: [...rules, ...(options.rules ?? [])],
});

/** @type {SecretLintConfigDescriptor} */
export const config = createConfig();

export default config;
