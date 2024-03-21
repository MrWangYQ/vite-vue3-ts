<template>
  <div class="login-container">
    <el-form
      ref="userFormRef"
      style="max-width: 600px"
      :model="userForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="userForm.account" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model="userForm.pwd"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="验证码" prop="imgcode">
        <el-input v-model.number="userForm.imgcode" />
      </el-form-item>
      <el-form-item>
        <el-button
          class="submit-button"
          type="primary"
          :loading="loading"
          native-type="submit"
          >Submit</el-button
        >
        <el-button @click="handleReset">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { IElForm, IFormRule } from '@/types/element-plus'
import type { FormInstance } from 'element-plus'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getCaptcha } from '@/api/common'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'

defineOptions({
  name: 'LoginPage'
})

const userFormRef = ref<IElForm | null>(null)
const loading = ref(false)
const captchaSrc = ref('')
const router = useRouter()
const route = useRoute()
const store = useStore()
const userForm = reactive({
  account: 'admin',
  pwd: '123456',
  imgcode: '1534'
})

const validatePass = (_rule: any, value: any, callback: any): void => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (userForm.pwd !== '') {
      if (userFormRef.value == null) return
      void userFormRef.value.validateField('pwd', () => null)
    }
    callback()
  }
}

const rules = reactive<IFormRule>({
  account: [{ required: true, message: '请输入账户', trigger: 'change' }],
  pwd: [{ required: true, validator: validatePass, message: '请输入密码', trigger: 'change' }],
  imgcode: [{ required: true, message: '请输入age', trigger: 'change' }]
})

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handleSubmit = async () => {
  const valid = await userFormRef.value?.validate()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!valid) {
    return false
  }
  // 验证通过展示 loading
  loading.value = true

  console.log(userForm)

  // 请求提交
  // const data = await login(userForm).finally(() => {
  //   loading.value = false
  // })
  // console.log(data)
  // 假数据，以为登录成功
  store.commit('setUser', {
    token: 'xasdijione2noi12',
    id: 1,
    account: 'admin',
    head_pic: 'xxxx'
  })
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  let redirect = route.query.redirect ?? '/'
  if (typeof redirect !== 'string') {
    redirect = '/'
  }
  router.replace(redirect).catch((e) => {
    console.log(e)
  })
}

const handleReset = (formEl: FormInstance | undefined): void => {
  if (formEl == null) return
  formEl.resetFields()
}

onMounted(() => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  loadCaptcha()
})

const loadCaptcha = async (): Promise<void> => {
  const data = await getCaptcha()
  captchaSrc.value = URL.createObjectURL(data)
}

</script>

<style lang="scss" scoped>
.login-container {
  min-width: 400px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  .login-form {
    padding: 20px;
    border-radius: 10px;
    background-color: #fff;
  }
}
</style>
