<template>
<div id="items" ref="draggableContainer">
  <slot></slot>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, type PropType } from 'vue'
// Default SortableJS
import Sortable from 'sortablejs'
// Core SortableJS (without default plugins)
// import Sortable from 'sortablejs/modular/sortable.core.esm.js'
// // Complete SortableJS (with all plugins)
// import Sortable from 'sortablejs/modular/sortable.complete.esm.js'

const draggableContainer = ref<HTMLDivElement | null>(null)

defineOptions({
  name: 'appHeader'
})

type EmitsType = (e: 'update:model-value', value: any[]) => void

const emit = defineEmits<EmitsType>()
const props = defineProps({
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => {
      return []
    }
  },
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => {
      return []
    }
  }
})

onMounted(() => {
  initDraggable()
  // console.log(props.activities)
})

const initDraggable = (): void => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!draggableContainer.value) {
    console.error('容器不能为空')
    return
  }
  const sortable = Sortable.create(draggableContainer.value, {
    animation: 200,
    onUpdate (e) {
      // e 中 newIndex  newDraggableIndex oldIndex newDraggableIndex 根据这四个操作数据
      // props.modelValue.splice(e.oldIndex, 1) // 因为 props modelValue 数据是单向数据流不能修改，需要备份
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 拷贝一份
        const list = props.modelValue.slice(0)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const item = list.splice(e.oldIndex, 1)[0] // 删除拖拽元素 返回删除的项
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        list.splice(e.newIndex, 0, item) // 添加元素
        emit('update:model-value', list) // 利用数据双向绑定 更新数组
      }
    }
  })
  console.log(sortable)
}
</script>

<style lang="scss" scoped>

</style>
