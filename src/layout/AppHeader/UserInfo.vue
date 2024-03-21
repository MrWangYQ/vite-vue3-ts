<template>
<el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
  <span class="el-dropdown-link">
    {{ $store.state.user?.account }}
    <el-icon class="el-icon--right">
      <arrow-up v-if="visible"/>
      <arrow-down v-else />
    </el-icon>
  </span>
  <template #dropdown>
    <el-dropdown-menu>
      <el-dropdown-item>个人中心</el-dropdown-item>
      <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </template>
</el-dropdown>
</template>

<script setup lang="ts">
import { logout } from '@/api/common'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const visible = ref(false)
const router = useRouter()
const store = useStore()

defineOptions({
  name: 'UserInfo'
})
const handleCommand = (): void => {
  console.log('handleCommand')
}

const handleVisibleChange = (): void => {
  console.log('handleVisibleChange')
  visible.value = !visible.value
}

const handleLogout = (): void => {
  ElMessageBox.confirm('确定要退出吗?', {
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      // 确定发出退出请求 - 暂时跳过
      await logout()

      // 清除 store 用户信息存储及 本地存储
      store.commit('setUser', null)

      ElMessage({
        type: 'success',
        message: '退出成功!'
      })

      // 跳转登录页
      router.push({
        name: 'login'
      })
        .catch(() => {})
    })
    .catch((e) => {
      console.log(e)

      ElMessage({
        type: 'info',
        message: '取消退出!'
      })
    })
}
</script>

<style lang="scss" scoped>

</style>
