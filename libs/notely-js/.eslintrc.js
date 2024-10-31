module.exports = exports = {
  "extends": ["../../.eslintrc.json"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "../../tsconfig.eslint.json",
    "tsconfigRootDir": __dirname,
    "extraFileExtensions": [".json"]
  },
  "ignorePatterns": [".eslintrc.js", "webpack.config.js", "*.json"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {}
    },
    {
      "files": ["*.ts", "*.tsx"],
      "rules": {}
    },
    {
      "files": ["*.js", "*.jsx"],
      "rules": {}
    },
    {
      "files": ["*.json"],
      "parser": "@typescript-eslint/parser",
      "rules": {
        "@nx/dependency-checks": "error"
      }
    }
  ]
}
