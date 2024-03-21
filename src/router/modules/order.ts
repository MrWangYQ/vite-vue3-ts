import { type RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'order',
  name: 'order',
  component: RouterView,
  meta: { // 自定义路由元信息
    title: '订单'
  },
  children: [
    {
      path: 'list',
      name: 'order_list',
      component: async () => await import('@/views/order/list/index.vue'),
      meta: { // 自定义路由元信息
        title: '订单列表'
      }
    },
    {
      path: 'offline',
      name: 'order_offline',
      component: async () => await import('@/views/order/offline/index.vue'),
      meta: { // 自定义路由元信息
        title: '订单offline'
      }
    }
  ]
}

export default routes
