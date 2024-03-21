<template>
  <el-dialog
    ref="dialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          @click="handleConfirm"
        >确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IElDialog } from '@/types/element-plus'

defineOptions({
  name: 'dialogForm'
})

const props = defineProps({
  confirm: {
    type: Function,
    default: async () => {
      await Promise.resolve()
    }
  }
})
// type EmitsType = (e: 'confirm') => void
// const emit = defineEmits<EmitsType>()
const confirmLoading = ref(false)
const dialog = ref<IElDialog | null>(null)

const handleCancel = (): void => {
  if (dialog.value != null) {
    dialog.value.visible = false
  }
}

const handleConfirm = async (): Promise<void> => {
  confirmLoading.value = true
  // emit('confirm')
  await props.confirm()
  confirmLoading.value = false
}
</script>

<style lang="scss" scoped>

</style>
