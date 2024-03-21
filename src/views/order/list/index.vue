<template>
  <div>
    order list
    <el-button
      @click="handleExportExcel"
      >导出表格</el-button>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'orderList'
})

const handleExportExcel = async (): Promise<void> => {
  const { jsonToExcel } = await import('@/utils/export-to-excel')
  jsonToExcel({
    data: [
      { id: 1, name: '张三', age: 18 },
      { id: 2, name: '里斯', age: 18 },
      { id: 3, name: '王五', age: 18 }
    ],
    header: {
      id: '编号', name: '姓名', age: '年龄'
    },
    fileName: '导出',
    bookType: 'xlsx'
  })
}
</script>

<style lang="scss" scoped>

</style>
