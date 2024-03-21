<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in routes"
      :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import router from '@/router/index.ts'
import { computed } from 'vue'

defineOptions({
  name: 'breadCrumb'
})

const routes = computed(() => {
  return router.currentRoute.value.matched.filter(item => item.meta.title)
})

</script>

<style lang="scss" scoped>

</style>
