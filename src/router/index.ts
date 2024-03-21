import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'
import permissionRoutes from './modules/permission'
import productRoutes from './modules/product'
import orderRoutes from './modules/order'
import mediaRoutes from './modules/media'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { // 自定义路由元信息
      title: '首页',
      requiresAuth: true // 只有经过身份验证的用户才能创建帖子
    },
    children: [
      {
        name: 'home',
        path: '', // 默认子路由
        component: async () => await import('../views/home/index.vue')
      },
      productRoutes,
      permissionRoutes,
      orderRoutes,
      mediaRoutes
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: async () => await import('../views/login/index.vue'),
    meta: { // 自定义路由元信息
      title: '登录'
    }
  }
]

const router: Router = createRouter({
  history: createWebHistory(), // 路由模式
  routes // 路由规则
})

router.beforeEach((to) => {
  nprogress.start() // 开始加载进度条
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (to.meta.requiresAuth && !store.state.user) {
    // 此路由需要授权，请检查是否已登录
    // 如果没有，则重定向到登录页面
    return {
      path: '/login',
      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done() // 关闭
})

export default router
