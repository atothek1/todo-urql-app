import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import importsPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { default as reactRefresh } from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig( [
    globalIgnores( [ "dist" ] ),
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
    stylistic.configs.recommended,
    importsPlugin.flatConfigs.recommended,
    importsPlugin.flatConfigs.typescript,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat[ "jsx-runtime" ],
    {
        plugins: {
            "@stylistic": stylistic,
            "simple-import-sort": simpleImportSort,
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            "@stylistic/semi": [ "error", "always" ],
            "@stylistic/object-curly-spacing": [ "error", "always" ],
            "@stylistic/array-bracket-spacing": [ "error", "always" ],
            "@stylistic/computed-property-spacing": [ "error", "always" ],

            "@stylistic/quotes": [ "error", "double" ],
            "@stylistic/indent": [ "error", 4 ],
            "@stylistic/function-call-spacing": [ "error", "never" ],
            "@stylistic/space-in-parens": [ "error", "always" ],
            "@stylistic/template-curly-spacing": [ "error", "always" ],
            "@stylistic/type-annotation-spacing": "error",
            "@stylistic/type-generic-spacing": "error",
            "@stylistic/eol-last": [ "error", "always" ],
            "@stylistic/max-len": [ "error", {
                code: 140,
                ignoreComments: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreUrls: true,
            } ],
            "@stylistic/comma-dangle": [ "error", {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "never",
                exports: "never",
                functions: "never",
                importAttributes: "never",
                dynamicImports: "never",
                enums: "never",
                generics: "never",
                tuples: "always-multiline",
            } ],
            "@stylistic/jsx-wrap-multilines": [ "error", {
                declaration: "parens",
                assignment: "parens",
                return: "parens-new-line",
                arrow: "parens",
                condition: "ignore",
                logical: "ignore",
                prop: "ignore",
                propertyValue: "ignore",
            } ],
            "@stylistic/jsx-indent-props": [ "warn", 4 ],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                },
            ],
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "import/no-unresolved": [
                "error",
                {
                    // atm not proberly support with the eslint v9 changes
                    ignore: [
                        "@vitejs/plugin-react",
                        "vite",
                        "@rolldown/plugin-babel",
                        "eslint/config",
                        "typescript-eslint",
                    ],
                },
            ],
        },
    },
] );
