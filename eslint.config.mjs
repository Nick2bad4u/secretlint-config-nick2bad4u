import nickTwoBadFourU from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.all,
    {
        files: ["**/*.toml"],
        rules: {
            // Tombi 1.1.7 formats the same TOML differently on Windows and Linux.
            "tombi/tombi": "off",
        },
    },

    // Add repository-specific config entries below as needed.
];

export default config;
