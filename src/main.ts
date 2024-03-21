import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import components from './plugins/components'
// 加载全局样式
import './styles/index.scss'

// createApp 工厂函数创建 vue 实例。挂载到 标签节点上
createApp(App)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  .use(router as any)
  .use(components)
  .use(store, key)
  .use(elementPlus)
  .mount('#app')
