// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />
declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}

declare module 'element-plus/dist/locale/zh-cn.mjs'
