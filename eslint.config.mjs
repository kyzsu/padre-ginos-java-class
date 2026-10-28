import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";

// tujuan dari eslint.config.mjs adalah untuk mengatur konfigurasi ESLint, sebuah alat yang digunakan untuk menganalisis kode JavaScript dan menemukan masalah potensial. Konfigurasi ini menggabungkan beberapa pengaturan, termasuk aturan yang direkomendasikan oleh ESLint, pengaturan untuk file JavaScript, dan integrasi dengan Prettier untuk memastikan konsistensi format kode. Dengan konfigurasi ini, pengembang dapat menjaga kualitas kode mereka dan mengikuti praktik terbaik dalam pengembangan JavaScript.
/** @type {import('eslint').Linter.Config} */
export default [
  js.configs.recommended,
  {
    ...reactPlugin.configs.flat.recommended,
    settings: { react: { version: "detect" } },
  },
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // rules digunakan untuk menonaktifkan aturan tertentu dari plugin React. Dalam hal ini, aturan "react/no-unescaped-entities" dan "react/prop-types" dinonaktifkan. Aturan "react/no-unescaped-entities" biasanya digunakan untuk mencegah penggunaan karakter khusus dalam JSX yang dapat menyebabkan masalah rendering, sementara aturan "react/prop-types" digunakan untuk memeriksa tipe properti yang diteruskan ke komponen React. Dengan menonaktifkan aturan ini, pengembang memiliki lebih banyak fleksibilitas dalam menulis kode mereka tanpa harus mematuhi pembatasan tertentu dari plugin React. Karakter khusus yang dimaksud dalam aturan "react/no-unescaped-entities" termasuk tanda kutip tunggal ('), tanda kutip ganda ("), tanda kurung sudut (< dan >), dan karakter lain yang memiliki makna khusus dalam HTML atau JSX. Jika karakter-karakter ini digunakan secara langsung dalam JSX tanpa di-escape, mereka dapat menyebabkan masalah rendering atau perilaku yang tidak diinginkan dalam aplikasi React. Dengan menonaktifkan aturan ini, pengembang dapat menggunakan karakter-karakter tersebut secara langsung dalam JSX tanpa harus mengkhawatirkan masalah rendering.
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];
