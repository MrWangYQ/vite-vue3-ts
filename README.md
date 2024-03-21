# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.



不需要打包的静态资源
后台 API 接口封装
需要打包的静态资源
公共组件
通用的组合式 API
页面布局模板
插件
路由
Vuex 存储
样式
全局通用样式
工具模块
路由页面
根组件
入口模块
  
├─.vscode
│      extensions.json
├─public                         # 不需要打包的静态资源
│  ─vite.svg
│      
|─src
│   ├─api                        # 后台 API 接口封装
│   ├─assets                     # 需要打包的静态资源
│   │      vue.svg
│   ├─components                 # 公共组件
│   │      HelloWorld.vue
│   ├─compsables                 # 通用的组合式 API
│   ├─layout                     # 页面布局模板
│   ├─plugins                    # 插件
│   ├─router                     # 路由
│   ├─store                      # Vuex 存储
│   ├─styles                     # 样式
|        |- index.scss           # 全局通用样式
│   ├─utils                      # 工具模块 
│   |─views                      # 路由页面
|   │─ App.vue                   # 根组件
│   │─ main.ts                   # 入口模块
│   │─ vite-env.d.ts             # 
│─ .gitignore
│─ 1.txt
│─ index.html
│─ package-lock.json
│─ package.json
│─ README.md
│─ tsconfig.json
│─ tsconfig.node.json
│─ vite.config.ts

components 
composables 对组合式 api 封装的函数


1、如何看到不符合二规范的错误提示
2、如何按照项目中 ESLint 规则要求尽心格式化

1、禁用/禁用 vetur 插件
2、安装 ESLint 插件
   - 只有安装并启用了这个插件，它就会自动查找项目中的 eslint 配置规范，并且给出验证提示
   - 如何格式化？ ESLint 

   Eslint, Format: Enable
     勾选 Enables ESLint as a formatter.
   
   Eslint: Run  编写代码实时的提示
      Run the linter on save (onSave) or on type (onType)
      onType / onSave  实时/保存(编辑器里的辅助验证)
3、安装 Volar 插件 适配 vue3 + ts 



<template>
<div>
  xxx
</div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'appHeader'
})
</script>

<style lang="scss" scoped>

</style>
