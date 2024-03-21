<template>
<el-pagination
  :current-page="props.page"
  :page-size="props.limit"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
  :pageSizes="[10, 20, 30, 50, 100]"
  :total="listCount"
  :hide-on-single-page="true"
  background
  layout="total,sizes,prev,pager,next,jumper"
  style="padding: 20px 0;"/>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineOptions({
  name: 'appHeader'
})

const props = defineProps({
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  listCount: {
    type: Number,
    default: 10
  },
  loadList: {
    type: Function,
    default: () => {}
  },
  obj: {
    type: Object as PropType<{ a: string, b: number }>
  }
})

// TS 配置类型
// interface PropsType {
//   page: number
//   limit: number
//   listCount: number
//   loadList: () => void
// }
// 配置默认值 加 TS 类型校验
// const props = withDefaults(defineProps<PropsType>(), {
//   page: 1,
//   listmi: 10,
//   listCount: 0,
//   loadList: () => {}
// })

interface EmitsType {
  (e: 'update:page', page: number): void
  (e: 'update:limit', limit: number): void
}

const emit = defineEmits<EmitsType>()
// const emit = defineEmits(['update:page', 'update:limit'])

const handleCurrentChange = async (page: number): Promise<void> => {
  emit('update:page', page)
  props.loadList().catch(() => {})
}

const handleSizeChange = async (size: number): Promise<void> => {
  emit('update:page', 1)
  emit('update:limit', size)

  props.loadList().catch(() => {})
}

</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
