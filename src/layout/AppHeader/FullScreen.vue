<template>
  <el-icon @click="toggleFullScreen"><FullScreen /></el-icon>
</template>

<script setup lang="ts">
defineOptions({
  name: 'appHeader'
})

function toggleFullScreen (): any {
  if (document.fullscreenElement == null) {
    void document.documentElement.requestFullscreen()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  } else if (document.exitFullscreen) {
    void document.exitFullscreen()
  }
}

</script>

<style lang="scss" scoped>

</style>
