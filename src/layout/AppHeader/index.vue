<template>
  <el-space>
    <ToggleSideBar />
    <BreadCrumb />
  </el-space>
  <el-space>
    <FullScreen />
    <UserInfo />
  </el-space>
</template>

<script setup lang="ts">
import ToggleSideBar from './ToggleSidebar.vue'
import BreadCrumb from './BreadCrumb.vue'
import FullScreen from './FullScreen.vue'
import UserInfo from './UserInfo.vue'

defineOptions({
  name: 'appHeader'
})
</script>

<style lang="scss" scoped>

</style>
