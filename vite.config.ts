import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      cache: false // 禁用缓存。只是对某个修改的校验，不是全部
    }), // {// 配置选项}
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    })
  ]
  // 通过将 babel 转换选项传递给 js 插件配置 babel
  // optimizeDeps: {
  //   include: ["@vue/babel-plugin-jsx"],
  // },
  // esbuild: {
  //   // 告诉 esbuild 在 JSX 文件中添加自定义转换规则，以便使用 Vue JSX
  //   jsxFactory: "_c",
  //   jsxFragment: "_Fragment",
  // },
})
