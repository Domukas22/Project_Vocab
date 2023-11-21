module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // "quote-props": ["error", "consistent-as-needed"],
    "jest/no-large-snapshots": [
      "warn",
      {
        maxSize: 15,
      },
    ],
  },
  globals: {
    PropTypes: "readonly",
  },
  overrides: [
    {
      files: ["*.jsx"],
      rules: {
        // "react/prop-types": "off",
      },
    },
  ],
};
