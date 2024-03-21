import { defineAsyncComponent, type App, type AsyncComponentLoader } from 'vue'

export default {
  install (app: App) {
    const components = import.meta.glob('@/components/**/*.vue')
    for (const [name, value] of Object.entries(components)) {
      const componentName = name.substring(
        name.lastIndexOf('/') + 1,
        name.lastIndexOf('.')
      )
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      app.component(`App${componentName}`, defineAsyncComponent(value as AsyncComponentLoader))
    }
  }
}

// 两种方式注册
// 1、vite 特性 import.meta.glob() 读取
// 01、const components = import.meta.glob('@/components/**/*.vue')
// components 读取如下
// {/src/components/Card/index.vue: ƒ, /src/components/Card/index.vue: ƒ}
// /src/components/Pagination/index.vue: () => import("/src/components/Pagination/index.vue")
// /src/components/HelloWorld.vue: () => import("/src/components/HelloWorld.vue")
// [[Prototype]]: Object
// 02、const name = Object.entries(components)
// Object.entries(components) 读取内容如下
// (2) [Array(2), Array(2)]
// 0:(2) ['/src/components/AppCard.vue', ƒ]
// 1:(2) ['/src/components/HelloWorld.vue', ƒ]
// length:2
// [[Prototype]]:Array(0)

// 2、require.context 读取内容
// const ctx = require.context('./', false, /\.vue$/)
// ctx.keys().forEach(item => {
//   const component = ctx(item).default
//   app.component(component.name, component)
// })
