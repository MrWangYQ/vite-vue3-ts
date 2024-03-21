module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}",
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "vue-eslint-parser", // 解决 Parsing error: '>' expected 报错
    "parserOptions": {
        "parser": "@typescript-eslint/parser", // should be already existing
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": ["tsconfig.json", "tsconfig.node.json"],
        "extraFileExtensions": [".vue"], // new
    },
    "plugins": [
        "vue",
    ],
    "rules": {
        "vue/no-mutating-props": "off"
    },
    "overrides": [
        {
            files: ['src/api/**/*.ts'],
            rules: {
                camelcase: 'off' // 关闭驼峰命名
            }
        }
    ], // 重写规则 
}
