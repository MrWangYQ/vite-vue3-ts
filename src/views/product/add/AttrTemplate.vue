<template>
<el-space>
  <el-select
    v-model="value"
    style="width: 200px">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.attr_name"
      :value="item.attr_value"></el-option>
  </el-select>
  <el-button type="primary" @click="handleConfirm">确认</el-button>
  <el-button>添加规格模板</el-button>
</el-space>
</template>

<script setup lang="ts">
import type { ProductAttrTpl, ProductAttr, AttrRuleValue } from '@/api/types/product'
import { onMounted, ref, type PropType } from 'vue'
import { getAttrs } from '@/api/product'

defineOptions({
  name: 'attrTemplate'
})

type EmitsType = (e: 'confirm', value: AttrRuleValue[]) => void
// 等价关系
// interface EmitsType { (e: 'confirm', value: AttrRuleValue[]): void }
const emit = defineEmits<EmitsType>()
const props = defineProps({
  modelValue: {
    type: Array as PropType<ProductAttr[]>,
    default: () => {
      return []
    }
  }
})

console.log(props)
const value = ref('')
const options = ref<ProductAttrTpl[]>([
  { attr_name: '模板1', attr_value: '1', id: 1, rule_name: '手机', rule_value: [] },
  { attr_name: '模板2', attr_value: '2', id: 2, rule_name: '手机', rule_value: [] },
  { attr_name: '模板3', attr_value: '3', id: 3, rule_name: '手机', rule_value: [] }
])

onMounted(() => {
  loadAttrs().catch(() => {})
})

const loadAttrs = async (): Promise<void> => {
  const data = await getAttrs()
  options.value = data
}

const handleConfirm = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (value.value) {
    const item = options.value.find(item => item.attr_value)?.rule_name
    console.log(item, value.value)

    if (item != null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      emit('confirm', [{ value: '内存', detail: ['6G', '8G'] }, { value: '硬盘', detail: ['128G', '256G'] }])
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
