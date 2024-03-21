<template>
<el-card
  class="app-card"
  v-bind="$attrs">
  <template #header v-if="$slots.header">
    <slot name="header" />
  </template>
  <slot></slot>
  <template #footer v-if="$slots.footer">
    <slot name="footer" />
  </template>
</el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppCard'
})

defineProps({
  shadow: {
    type: String,
    default: 'always'
  },
  bodyStyle: {
    type: Object,
    default: () => {
      return {}
    }
  },
  bodyClass: {
    type: String,
    default: ''
  },
  header: {
    type: String,
    default: ''
  },
  footer: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.app-card {
  margin-bottom: 20px;
}
</style>
