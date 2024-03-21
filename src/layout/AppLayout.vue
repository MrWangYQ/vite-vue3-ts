<template>
  <el-container>
    <el-aside>
      <AppMenu />
    </el-aside>
    <el-container>
      <el-header class="flex flex-middle flex-around">
        <AppHeader />
      </el-header>
      <el-main>
        <!-- 子路由 -->
        <router-view />
      </el-main>
      <el-footer>
        <AppFooter />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppMenu from './AppMenu/index.vue'
import AppHeader from './AppHeader/index.vue'
import AppFooter from './AppFooter/index.vue'

</script>

<style lang="scss" scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  width: auto;
  background-color: #545c64;
  color: #333;
}

.el-main {
  background-color: #fff;
  color: #333;
}

.el-container {
  height: 100vh;
}
</style>
