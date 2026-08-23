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
    {
        files: ["preset.coverage.mjs"],
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        "*.{js,mjs,cjs}",
                        ".*.{js,mjs,cjs}",
                        "preset.coverage.mjs",
                    ],
                    defaultProject: "tsconfig.js.json",
                },
            },
        },
        rules: {
            // This JavaScript-only Node test imports the published .mjs entrypoint
            // directly so native coverage measures the shipped runtime.
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
        },
    },

    // Add repository-specific config entries below as needed.
];

export default config;
