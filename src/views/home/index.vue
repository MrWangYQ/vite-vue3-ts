<template>
    <h1>首页</h1>
    <p>{{ store.state.count }}</p>
    <el-button>测试按钮</el-button>
    <div class="block">
      <span class="demonstration">Picker with quick options</span>
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="Pick a day"
        :disabled-date="disabledDate"
        :shortcuts="shortcuts"
        :size="size"
      />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '../../store'
// 找不到模块“@/api/user”或其相应的类型声明 提示是因为 ts 不支持，需要 ts添加配置
// import User from '@/api/user'

const size = ref<'default' | 'large' | 'small'>('default')
const value2 = ref('')

const shortcuts = [
  {
    text: 'Today',
    value: new Date()
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    }
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    }
  }
]

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

defineOptions({
  name: 'HomePage'
})

const store = useStore()

console.log(store.state.count)
// console.log(User)

</script>

<style lang="scss">
h1 {
  color: $color;
}
</style>
