import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

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
  ],
  // 通过将 babel 转换选项传递给 js 插件配置 babel
  // optimizeDeps: {
  //   include: ["@vue/babel-plugin-jsx"],
  // },
  // esbuild: {
  //   // 告诉 esbuild 在 JSX 文件中添加自定义转换规则，以便使用 Vue JSX
  //   jsxFactory: "_c",
  //   jsxFragment: "_Fragment",
  // },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";' // 因为最终会注入到页面当中
      }
    }
  },
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
      // '/foo': 'http://localhost:4567',
      // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://localhost:3000', // 代理的目标地址
        // 兼容基于名字的虚拟主机
        // 请求 a.com，只想 a.com 本地的 localhost:xxx
        // 请求 b.com，只想 b.com 本地的 localhost:xxx
        // 请求时 HTTP 请求头部的 origin 字段 拿到域名的
        // 我们在开发模式，默认的 origin 是真实的 origin:  localhost: 3000
        // changeOrigin: true,代理服务会把 origin 修改为目标地址:  http://jsonplocaholder.typicode.com
        changeOrigin: true,
        // 路径重写
        // http://jsonplocaholder.typicode.com/api/xxx
        // /api/xxx => http://jsonplocaholder.typicode.com/api/xxx
        // 如果想要 http://jsonplocaholder.typicode.com/xxx 不要 api。即要用到重写
        rewrite: (path) => path.replace(/^\/api/, '')
      }
      // 正则表达式写法：http://localhost:5173/fallback/ -> http://jsonplaceholder.typicode.com/
      // '^/fallback/.*': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, '')
      // },
      // // 使用 proxy 实例
      // '/xxx': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy 是 'http-proxy' 的实例
      //   }
      // },
      // // 代理 websockets 或 socket.io 写法：ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:5174',
      //   ws: true
      // }
    }
  }
})
