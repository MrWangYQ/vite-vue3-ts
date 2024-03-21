<template>
<el-icon @click="toggleCollapseClick">
  <Fold v-if="!store.state.isCollapse"/>
  <Expand v-else/>
</el-icon>

</template>

<script setup lang="ts">
import { useStore } from '@/store'

defineOptions({
  name: 'toggleSideBar'
})

const store = useStore()

const toggleCollapseClick = (): any => {
  store.commit('setIsCollapse', !store.state.isCollapse)
}
</script>

<style lang="scss" scoped>

</style>
