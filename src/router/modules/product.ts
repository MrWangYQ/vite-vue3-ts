import { type RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'product',
  name: 'product',
  component: RouterView,
  meta: { // 自定义路由元信息
    title: '商品'
  },
  children: [
    {
      path: 'list',
      name: 'list',
      component: async () => await import('@/views/product/list/index.vue'),
      meta: { // 自定义路由元信息
        title: '商品列表'
      }
    },
    {
      path: 'add',
      name: 'add',
      component: async () => await import('@/views/product/add/index.vue'),
      meta: { // 自定义路由元信息
        title: '新增商品',
        hidden: false
      }
    },
    {
      path: 'attr',
      name: 'attr',
      component: async () => await import('@/views/product/attr/index.vue'),
      meta: { // 自定义路由元信息
        title: '商品规则'
      }
    },
    {
      path: 'reply',
      name: 'reply',
      component: async () => await import('@/views/product/reply/index.vue'),
      meta: { // 自定义路由元信息
        title: '商品评论'
      }
    },
    {
      path: 'classify',
      name: 'classify',
      component: async () => await import('@/views/product/classify/index.vue'),
      meta: { // 自定义路由元信息
        title: '商品分类'
      }
    }
  ]
}

export default routes
