<template>
<el-table
  :data="props.modelValue"
  border>
  <slot name="prepend" />
  <el-table-column
    label="图片"
    prop="pic"
    min-width="180">
    <template #default="{ row }">
      <el-input
        v-model="row.pic"
        controls-position="right"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="售价"
    width="180">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.price"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="成本价"
    width="180">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.cost"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="原价"
     width="180">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.ot_price"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="库存"
    prop="image"
    width="180">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.stock"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="商品编号"
    width="180">
    <template #default="{ row }">
      <el-input
        v-model="row.bar_code"
        controls-position="right"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="重量(KG)"
    min-width="150">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.weight"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <el-table-column
    label="体积(m³)"
    width="180">
    <template #default="{ row }">
      <el-input-number
        v-model.number="row.volume"
        controls-position="right"
        :min="0"
      />
    </template>
  </el-table-column>
  <slot name="append"/>
</el-table>
</template>

<script setup lang="ts">
import type { ProductAttr } from '@/api/types/product'
import type { PropType } from 'vue'

defineOptions({
  name: 'attrTable'
})

const props = defineProps({
  modelValue: {
    type: Array as PropType<ProductAttr[]>,
    default: () => {
      return []
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
