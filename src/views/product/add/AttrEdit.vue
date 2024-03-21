<template>
<el-form
  label-position="left"
  label-width="auto"
  @submit.prevent
>
  <app-draggable
    v-model="data"
    :options="{ filter: '.el-icon' }">
    <el-form-item
      v-for="(item, index) in data"
      :key="item.value"
      :label="item.value"
      class="noflex">
      <template #label>
        <el-icon>
          <Menu />
        </el-icon>
      </template>
      <div>
        <el-tag
          closable
          effect="dark"
          @close="data.splice(index, 1)">{{ item.value }}</el-tag>
      </div>
      <div>
        <el-space>
          <app-draggable v-model="item.detail" style="display: inline-block;">
            <el-tag
              v-for="(detail, detailIndex) in item.detail"
              closable
              effect="plain"
              :key="detail"
              style="margin-right: 8px;"
              @close="item.detail.splice(detailIndex, 1)">
              {{ detail }}
            </el-tag>
            <el-input
              v-if="item.inputVisible"
              ref="InputRef"
              v-model="item.inputValue"
              style="width: 100px"
              size="small"
              @keyup.enter="handleInputConfirm(item)"
              @blur="handleInputConfirm(item)"
            />
            <el-button
              v-else
              class="button-new-tag"
              size="small" @click="showInput(item)">
            新增
            </el-button>
          </app-draggable>
        </el-space>
      </div>
    </el-form-item>
  </app-draggable>

  <el-form-item v-if="!isAdd">
    <el-space>
      <el-button
        type="primary"
        @click="isAdd = true">
        添加新规格
      </el-button>
      <el-button
      type="success"
      @click="handleGenerate">
      立即生成
    </el-button>
  </el-space>
  </el-form-item>
  <el-form-item v-if="isAdd">
    <el-form
      :model="attrForm"
      :rules="attrFormRules"
      ref="attrFormRef"
      inline
      @submit.prevent>
      <el-form-item
        label="规格名称"
        prop="value">
        <el-input v-model="attrForm.value" />
      </el-form-item>
      <el-form-item
        label="规格值"
        prop="value">
        <el-input v-model="attrForm.detail[0]" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="handleAddAttr">
          确认
        </el-button>
        <el-button
          @click="isAdd = false">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </el-form-item>
</el-form>
</template>

<script setup lang="ts">
import type { AttrRuleValue } from '@/api/types/product'
import { type PropType, nextTick, watch, ref } from 'vue'
import { generateAttr } from '@/api/product'
import { ElInput } from 'element-plus'

defineOptions({
  name: 'attrEdit'
})

const emit = defineEmits(['confirm', 'update:model-value'])
const props = defineProps({
  modelValue: {
    type: Array as PropType<AttrRuleValue[]>,
    default: () => []
  }
})

const isAdd = ref(false)
const attrFormRef = ref<HTMLFormElement | null>(null)
const attrForm = ref<AttrRuleValue>({
  value: '',
  detail: ['']
})
const attrFormRules = ref({
  value: [
    { required: true, message: '请输入规格名称', change: 'change' }
  ],
  detail: [
    { required: true, message: '请输入规格值', change: 'change' }
  ]
})
// const InputRef = ref<InstanceType<typeof ElInput> | null>(null)
const InputRef = ref<HTMLElement | null>(null)

// const handleClose = (tag: string): void => {
//   dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
// }
type RuleTagValue = {
  inputValue: string
  inputVisible: boolean
} & AttrRuleValue
// 更新 props 传递的数据 ，由两种方案。
// 第二种 组件内 @click="data.splice(index, 1)" 即可
const data = ref<RuleTagValue[]>([])
// 监听 porps.modelvalue 的原因是 子组件拷贝一份数据修改了之后，再点击加载模板不生效。因为 副本data 只在组件实例的时候初始化了一次
watch(props.modelValue, value => {
  const temp = JSON.parse(JSON.stringify(value)) as AttrRuleValue[]
  data.value = temp.map(item => ({
    ...item,
    inputVisible: false,
    inputValue: ''
  }))
  emit('update:model-value', temp)
}, {
  immediate: true,
  deep: true
})

watch(data, value => {
  emit('update:model-value', value)
}, {
  deep: true
})
// 第一种是如下。第二种是修改 watch 监听
// const handleUpdateModelValue = (index: number): void => {
//   const data = JSON.parse(JSON.stringify(props.modelValue))
//   data.splice(index, 1)
//   emit('update:model-value', data)
// }
const showInput = async (item: RuleTagValue): Promise<void> => {
  item.inputVisible = true
  await nextTick().catch(() => {})
  // InputRef.value 是一个 响应式数组 需要单独取出
  // InputRef.value[0].input?.focus()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (InputRef.value) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    InputRef.value?.focus()
  }
}

const handleInputConfirm = (item: RuleTagValue): void => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (item.inputValue) {
    item.detail.push(item.inputValue)
  }
  item.inputVisible = false
  item.inputValue = ''
}

const handleGenerate = async (): Promise<void> => {
  const data = await generateAttr(0, 1, {
    attrs: props.modelValue
  })
  emit('confirm', data)
}

const handleAddAttr = async (): Promise<void> => {
  const valid = attrFormRef.value?.validate()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!valid) return
  data.value.push({
    value: attrForm.value?.value,
    detail: attrForm.value?.detail,
    inputVisible: false,
    inputValue: ''
  })
  isAdd.value = false
  attrFormRef.value?.resetFields()
}
</script>

<style lang="scss" scoped>
.el-form-item.noflex {
  :deep(.el-form-item__content) {
    display: block;
  }
}
</style>
