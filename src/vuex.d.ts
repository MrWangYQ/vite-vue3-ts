// Vuex 没有为 this.$store 属性提供开箱即用的类型声明。如果你要使用 TypeScript，首先需要声明自定义的模块补充(module augmentation)。
// 为此，需要在项目文件夹中添加一个声明文件来声明 Vue 的自定义类型
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { ComponentCustomProperties } from 'vue'
import { type Store } from 'vuex'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { stateType } from './store/index'

declare module '@vue/runtime-core' {
  // 声明自己的 store state
  // interface State {
  //   count: number
  // }

  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
