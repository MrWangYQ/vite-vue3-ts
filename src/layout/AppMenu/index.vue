<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    :collapse="store.state.isCollapse"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/">
      <el-icon><Menu /></el-icon>
      <span>首页</span>
    </el-menu-item>

    <el-sub-menu index="product">
      <template #title>
        <el-icon><Menu /></el-icon>
        <spam>商品</spam>
      </template>
      <el-menu-item index="/product/list">
        <el-icon><Menu /></el-icon>
        <template #title>商品列表</template>
      </el-menu-item>
      <el-menu-item index="/product/classify">
        <el-icon><Menu /></el-icon>
        <template #title>商品分类</template>
      </el-menu-item>
      <el-menu-item index="/product/attr">
        <el-icon><Menu /></el-icon>
        <template #title>商品规则</template>
      </el-menu-item>
      <el-menu-item index="/product/reply">
        <el-icon><Menu /></el-icon>
        <template #title>商品评论</template>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="order">
      <template #title>
        <el-icon><Menu /></el-icon>
        <spam>订单</spam>
      </template>
      <el-menu-item index="/order/list">
        <el-icon><Menu /></el-icon>
        <template #title>订单列表</template>
      </el-menu-item>
      <el-menu-item index="/order/offline">
        <el-icon><Menu /></el-icon>
        <template #title>订单列表</template>
      </el-menu-item>
    </el-sub-menu>

    <el-menu-item index="/media">
      <el-icon><setting /></el-icon>
      <span>媒体</span>
    </el-menu-item>

    <el-sub-menu index="permission">
      <template #title>
        <el-icon><Menu /></el-icon>
        <spam>权限</spam>
      </template>
      <el-menu-item index="/permission/role">
        <el-icon><Menu /></el-icon>
        <template #title>角色</template>
      </el-menu-item>
      <el-menu-item index="/permission/admin">
        <el-icon><Menu /></el-icon>
        <template #title>管理员</template>
      </el-menu-item>
      <el-menu-item index="/permission/rule">
        <el-icon><Menu /></el-icon>
        <template #title>权限规则</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useStore } from '@/store'

defineOptions({
  name: 'appMenu'
})

const store = useStore()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
