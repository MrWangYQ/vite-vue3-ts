import { createStore, useStore as baseUseStore, type Store } from 'vuex'
import { type InjectionKey } from 'vue'
import { type IUserInfo } from '@/api/types/common'
import { setItem, getItem } from '@/utils/storage'
import { USER } from '@/utils/contants'
// export interface stateType {
//   count: number
//   isCollapse: boolean
//   user: IUserInfo
// }

const state = {
  count: 1,
  isCollapse: false,
  user: getItem<{ token: string } & IUserInfo>(USER) // 合并 token
  // user: JSON.parse((window.localStorage.getItem('user') ?? '')) as IUserInfo | null
}
// console.log(state)

export type State = typeof state

// 创建 InjectionKey
export const key: InjectionKey<Store<State>> = Symbol('store')

// 创建一个新的 store 实例
export const store = createStore<State>({
  state,
  mutations: {
    increment (state) {
      state.count++
    },
    setIsCollapse (state, payload) {
      state.isCollapse = payload
    },
    setUser (state, payload) {
      state.user = payload
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER, state.user)
    }
  }
})

// 定义自己的 `useStore` 组合式函数
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useStore () {
  return baseUseStore(key)
}
