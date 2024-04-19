module.exports = {
  // ...other ESLint rules
  rules: {
    // ...other rules
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", ["parent", "sibling", "index"]],
        "newlines-between": "always",
      },
    ],
  },
};
