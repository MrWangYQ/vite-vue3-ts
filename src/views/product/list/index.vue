<template>
  <app-card>
    <el-button @click="handleCreateProduct">新增商品</el-button>
  </app-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineOptions({
  name: 'productList'
})

const router = useRouter()

const handleCreateProduct = (): void => {
  router.push({
    path: 'add'
  }).catch(() => {})

  console.log('handleCreateProduct')
}
</script>

<style lang="scss" scoped>

</style>
