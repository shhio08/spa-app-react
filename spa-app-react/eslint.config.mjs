import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier"; // Prettier プラグインをインポート
import configPrettier from "eslint-config-prettier"; // Prettier の設定をインポート


export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      prettier: pluginPrettier, // プラグインをオブジェクト形式で定義
    },
    rules: {
      "prettier/prettier": "error", // Prettier のルールをエラーとして扱う
    },
  },
  configPrettier, // Prettier の設定を追加
  {
    ignores: ["**/*.css", "**/*.svg"], // CSSおよびSVGファイルを無視する
  },
];