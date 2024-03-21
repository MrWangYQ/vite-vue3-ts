<template>
  <app-dialog-form
    :title="props.adminId ? '编辑管理员' : '添加管理员'"
    :confirm="handleSubmit"
    @closed="handleDialogClose"
    @open="handleDialogOpen"
    >
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading">
      <el-form-item
        label="管理员账号"
        prop="account">
        <el-input
          v-model="formData.account"
          placeholder="请输入管理员账号" />
      </el-form-item>
      <el-form-item
        label="管理员密码"
        prop="pwd">
        <el-input
          type="password"
          v-model="formData.pwd"
          placeholder="请输入管理员密码" />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="conf_pwd">
        <el-input
          type="password"
          v-model="formData.conf_pwd"
          placeholder="请输入确认密码" />
      </el-form-item>
      <el-form-item
        label="管理员姓名"
        prop="real_name">
        <el-input
          type="password"
          v-model="formData.real_name"
          placeholder="请输入管理员姓名" />
      </el-form-item>
      <el-form-item
        label="管理员角色"
        prop="roles">
        <el-select
          multiple
          v-model="formData.roles"
          placeholder="请输入管理员角色">
          <el-option
            v-for="item in rolesList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="状态"
        prop="status">
        <el-radio-group
          v-model="formData.status">
          <el-radio :value="1">开启</el-radio>
          <el-radio :value="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </app-dialog-form>
</template>
<script setup lang="ts">
import { type PropType, ref, reactive, onMounted } from 'vue'
import type { IElForm, IFormRule } from '@/types/element-plus'
import { getRoles } from '@/api/admin'
import { type ISelectoptions } from '@/api/types/form'
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'adminForm'
})

// 因为外部用了 v-model:admin-id 即就不用 props 这种方式
const props = defineProps({
  adminId: {
    type: Number as PropType<number | null>,
    default: null
  } // 编辑的管理员 ID
})

interface EmitsType {
  (e: 'update:admin-id', value: number | null): void
  (e: 'success'): void
}
const emit = defineEmits<EmitsType>()
const formLoading = ref(false)
const form = ref<IElForm | null>(null)
const formData = ref({
  account: '',
  pwd: '',
  conf_pwd: '',
  roles: [] as number[],
  status: 0 as 0 | 1,
  real_name: ''
})

const rolesList = reactive([{ label: '管理员', value: '1' }])
const formRules: IFormRule = {
  account: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入管理员密码', trigger: 'blur' }
  ],
  conf_pwd: [
    { required: true, message: '请输入确认密码', trigger: 'blur' }
  ],
  roles: [
    { required: true, message: '请选择管理员角色', trigger: 'blur' }
  ],
  real_name: [
    { required: true, message: '请输入管理员姓名', trigger: 'blur' }
  ]
}

const roles = ref<ISelectoptions[] | undefined>([])

onMounted(() => {

})

const handleDialogOpen = (): void => {
  loadRoles().catch(() => {})
}

const loadRoles = async (): Promise<void> => {
  const data = await getRoles()
  roles.value = data
}

const handleDialogClose = (): void => {
  emit('update:admin-id', null)
  form.value?.clearValidate() // 清除验证结果
  form.value?.resetFields() // 清除表单数据
}

const handleSubmit = async (): Promise<void> => {
  const valid = await form.value?.validate()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!valid) {
    return
  }
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (props.adminId) {
    // 更新 请求
  } else {
    // 新增 请求
  }

  emit('success')

  await Promise.resolve()
  ElMessage.success('保存成功!')
}

</script>

<style lang="scss" scoped>

</style>
