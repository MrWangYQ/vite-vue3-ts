import { type RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'permission',
  name: 'permission',
  component: RouterView,
  meta: { // 自定义路由元信息
    title: '权限'
  },
  children: [
    {
      path: 'role',
      name: 'permission_role',
      component: async () => await import('@/views/permission/role/index.vue'),
      meta: { // 自定义路由元信息
        title: '角色'
      }
    },
    {
      path: 'admin',
      name: 'permission_admin',
      component: async () => await import('@/views/permission/admin/index.vue'),
      meta: { // 自定义路由元信息
        title: '管理员'
      }
    },
    {
      path: 'rule',
      name: 'permission_rule',
      component: async () => await import('@/views/permission/rule/index.vue'),
      meta: { // 自定义路由元信息
        title: '权限规则'
      }
    }
  ]
}

export default routes
