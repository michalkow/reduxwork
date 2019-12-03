module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:import/errors"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "globals": {
    "fetch": true
  },
  "rules": {
    "import/no-duplicates": ["error"],
    "import/no-unresolved": 2,
    "import/newline-after-import": ["error"],
    "import/first": "error",
    "padding-line-between-statements": [
      "error",
      { "blankLine": "never", "prev": "import", "next": "import" },
      { "blankLine": "always", "prev": "*", "next": "export" }
    ],
    "semi": ["error", "always"],
    "space-infix-ops": ["error", { "int32Hint": false }],
    "no-unused-vars": ["error", { "ignoreRestSiblings": true }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "getter-return": "error",
    "no-multi-spaces": "error",
    "no-param-reassign": "error",
    "no-throw-literal": "error",
    "no-undef-init": "error",
    "global-require": "error",
    "camelcase": ["warn", { "properties": "always" }],
    "comma-dangle": ["error", "never"],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never"],
    "eol-last": ["error", "never"],
    "keyword-spacing": ["error", { "after": true, "before": true }],
    "new-cap": ["error", { "newIsCap": true }],
    "new-parens": "error",
    "no-whitespace-before-property": "error",
    "space-in-parens": ["error", "never"],
    "quote-props": ["warn", "as-needed"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0, "maxBOF": 0 }],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "array-bracket-spacing": ["error", "never"],
    "key-spacing": ["error"],
    "space-before-blocks": "error",
    "block-spacing": "error",
    "no-trailing-spaces": "error",
    "prefer-arrow-callback": "warn",
    "arrow-parens": "off",
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "single"],
    "complexity": ["warn", { "max": 5 }],
    "max-nested-callbacks": ["warn", 3],
    "max-params": ["warn", 6],
    "prefer-destructuring": ["error", {
      "array": true,
      "object": true
    }, {
        "enforceForRenamedProperties": false
      }]
  }
}