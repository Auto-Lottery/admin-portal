module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "no-unused-vars": "off",
    "import/extensions": ["error", "never"],
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/no-array-index-key": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "no-underscore-dangle": ["off", { allowInObjectDestructuring: false }],
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
};
