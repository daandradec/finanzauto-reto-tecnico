export default {
    "extends": [
        "airbnb-typescript/base",
        "next/core-web-vitals",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["react", "@typescript-eslint", "prettier"],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": 'tsconfig.eslint.json',
        "tsconfigRootDir": __dirname,
    },
    "rules": {
        "quotes": [2, "double", { "avoidEscape": true }]
    }
}
