<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <HelloWorld ref="HWTRef" msg="Vite + Vue" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

// 能推断出类型
const HWTRef = ref<InstanceType<typeof HelloWorld> | null>(null)
// 推断不出类型 只有一些静态方法
// const HWTRef = ref<ComponentPublicInstance | null>(null)

onMounted(() => {
  console.log(HWTRef.value)
})

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
