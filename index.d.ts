import type { SecretLintConfigDescriptor } from "@secretlint/types";

/** Options for creating a Secretlint config descriptor. */
export interface Nick2Bad4USecretlintConfigOptions {
    /** Additional project-local rules appended after the shared rule set. */
    readonly rules?: SecretLintConfigDescriptor["rules"];
}

/** Rule descriptor accepted by `secretlint-config-nick2bad4u`. */
export type Nick2Bad4USecretlintRule =
    SecretLintConfigDescriptor["rules"][number];

/** Rule descriptors shipped by the shared Nick2bad4u Secretlint config. */
export declare const rules: SecretLintConfigDescriptor["rules"];

/** Create the shared Nick2bad4u Secretlint config descriptor. */
export declare const createConfig: (
    options?: Readonly<Nick2Bad4USecretlintConfigOptions>
) => SecretLintConfigDescriptor;

/** Shared Secretlint config descriptor. */
export declare const config: SecretLintConfigDescriptor;

export default config;
