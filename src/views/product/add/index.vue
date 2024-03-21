<template>
<el-form
  ref="form"
  :model="productForm"
  :rules="formRules"
  @submit.prevent="handleSubmit">
  <el-form-item
    label="编辑器"
    prop="activity">
    <!-- <app-text-editor></app-text-editor> -->
  </el-form-item>
  <el-form-item
    label="活动优先级"
    prop="activity">
    <el-space>
      <!-- 拖拽元素与 v-model 的数据必须一致 -->
      <app-draggable
        v-model="activities"
        :options="{
          animation: 300
        }">
        <el-tag
          v-for="item in activities"
          :key="item.type"
          :type="item.type"
          effect="dark"
          >{{ item.name }}</el-tag>
      </app-draggable>
    </el-space>
  </el-form-item>
  <el-form-item
    label="商品规格"
    prop="activity">
    <el-radio-group v-model="productForm.spec_type">
      <el-radio label="单规格" :value="0"></el-radio>
      <el-radio label="多规格" :value="1"></el-radio>
    </el-radio-group>

    <AttrTable
      v-if="productForm.spec_type === 0"
      v-model="singleAttrData"
    ></AttrTable>
  </el-form-item>
  <el-form-item
    label="规格模板"
    prop="activity"
    v-if="productForm.spec_type == 1">
    <el-space
      direction="vertical"
      alignment="left">
      <AttrTemplate
        @confirm="attrTpl = $event"/>
      <AttrEdit
        v-if="attrTpl && attrTpl.length"
        v-model="attrTpl"
        @confirm="handleAttrEditComfirm"/>
      <template v-if="multiAttrData.length">
        <div>批量设置</div>
        <AttrTable
          v-model="batchData"
        >
          <template #append>
            <el-table-column label="操作" fixed="right" minWidth="130">
              <template #default>
                <el-button link @click="handelBatchSet">批量添加</el-button>
                <el-button link @click="handelBatchClear">清空</el-button>
              </template>
            </el-table-column>
          </template>
        </AttrTable>
        <div>商品属性</div>
        <AttrTable
          v-model="multiAttrData">
          <template #prepend>
            <el-table-column
              v-for="item in tableHeader"
              :key="item.key"
              :prop="item.key"
              :label="item.title">
            </el-table-column>
          </template>
          <template #append>
            <el-table-column label="操作" fixed="right">
              <template #default="{ $index }">
                <el-button link @click="handleDeleteAttr($index)">删除</el-button>
              </template>
            </el-table-column>
          </template>
        </AttrTable>
      </template>
    </el-space>
  </el-form-item>

  <el-form-item class="flex-center">
    <el-button type="primary" native-type="submit">提交</el-button>
  </el-form-item>
</el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { AttrRuleValue, AttrTableHeader, ProductAttr } from '@/api/types/product'
import { type IElForm } from '@/types/element-plus'
import { saveProduct, getCategoryTree } from '@/api/product'
import { ElMessage } from 'element-plus'
import AttrTable from './AttrTable.vue'
import AttrTemplate from './AttrTemplate.vue'
import AttrEdit from './AttrEdit.vue'

defineOptions({
  name: 'addProduct'
})

const attrTpl = ref<AttrRuleValue[]>([])
const activities = ref([
  { type: 'info', name: '默认' },
  { type: 'danger', name: '秒杀' },
  { type: 'warning', name: '砍价' },
  { type: 'success', name: '拼团' }
])

console.log(computed(() => activities.value.map(item => item.name)))

// ProductCategory
const productCates = ref([])
const productForm = ref({
  activity: computed(() => activities.value.map(item => item.name)),
  attrs: [] as ProductAttr[], // 商品规格
  cate_id: [] as number[],
  command_word: '',
  couponName: [],
  coupon_ids: [],
  description: '',
  ficti: 0,
  give_intergral: 0,
  header: [] as AttrTableHeader[],
  id: 0,
  image: '',
  is_benefit: 0,
  is_best: 0,
  is_good: 0,
  is_hot: 0,
  is_new: 0,
  is_postage: 0,
  is_show: 0,
  is_sub: 0,
  items: [] as AttrRuleValue[],
  keyword: '',
  label_id: [],
  recommend_image: '',
  selectRule: '',
  slider_image: [],
  sort: 0,
  spec_type: 0 as 0 | 1, // 0 单规格 1 多规格
  store_info: '',
  store_name: '',
  temp_id: '',
  unit_name: '',
  video_link: ''
})

const singleAttrData = ref([{
  bar_code: '',
  brokerage: 0,
  brokerage_two: 0,
  cost: 2,
  ot_price: 3,
  pic: '',
  price: 1,
  stock: 4,
  vip_price: 0,
  volume: 6,
  weight: 5
}])
const multiAttrData = ref<ProductAttr[]>([])

const defaultBatchData = ref([{
  bar_code: '',
  brokerage: 0,
  brokerage_two: 0,
  cost: 0,
  ot_price: 0,
  pic: '',
  price: 0,
  stock: 0,
  vip_price: 0,
  volume: 0,
  weight: 0
}])

const batchData = ref(JSON.parse(JSON.stringify(defaultBatchData.value)))

watch([singleAttrData, multiAttrData, () => productForm.value.spec_type], () => {
  productForm.value.attrs = productForm.value.spec_type === 0
    ? singleAttrData.value
    : multiAttrData.value
}, {
  immediate: true,
  deep: true
})

const formRules = ref([{
  store_name: [
    { required: true, message: '请输入商品名称', tigger: 'blur' }
  ],
  cate_id: [
    { required: true, message: '请输入商品分类', tigger: 'change' }
  ],
  keyword: [
    { required: true, message: '请输入商品关键字', tigger: 'blur' }
  ],
  unit_name: [
    { required: true, message: '请输入单位', tigger: 'blur' }
  ],
  store_info: [
    { required: true, message: '请输入商品简介', tigger: 'blur' }
  ],
  image: [
    { required: true, message: '请上传商品图', tigger: 'blur' }
  ],
  slider_image: [
    { required: true, message: '请上传商品轮播图', tigger: 'blur' }
  ],
  spec_type: [
    { required: true, message: '请输入商品规格', tigger: 'blur' }
  ],
  selectRule: [
    { required: true, message: '请输入商品规格属性', tigger: 'blur' }
  ],
  temp_id: [
    { required: true, message: '请输入运费模板', tigger: 'blur' }
  ],
  give_intergral: [
    { type: 'interger', message: '请输入整数' }
  ]
}])

const form = ref<IElForm | null>(null)

onMounted(() => {
  localCates().catch(() => {}) // 获取列表
})

const handleSubmit = async (): Promise<boolean | undefined> => {
  const valid = await form.value?.validate()
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!valid) return false
  await saveProduct(0, productForm.value) // 保存规格数据
  ElMessage.success('保存成功!')
}

const localCates = async (): Promise<void> => {
  const data = await getCategoryTree(1)
  productCates.value = data
}

const handleAttrEditComfirm = (data: {
  attr: AttrRuleValue[]
  header: AttrTableHeader[]
  value: ProductAttr[]
}): void => {
  console.log(data, 'data')
  multiAttrData.value = data.value
  productForm.value.header = data.header
  productForm.value.items = data.attr
}

const tableHeader = computed(() => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  return productForm.value.header.filter((item: { key: string }) => item.key && item.key.startsWith('value'))
})

const handleDeleteAttr = (index: number): void => {
  multiAttrData.value.splice(index, 1)
}

const handelBatchSet = (): void => {
  // 过滤无效数据
  const data = batchData.value[0]
  const validData: Record<string, any> = {}
  let key: keyof typeof data
  for (key in data) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (data[key]) {
      validData[key] = data[key] // validData 中的 key 不能直接赋值，因为是多个类型，需要联合类型
    }
  }
  // 取到有效值，然后批量赋值
  multiAttrData.value.forEach(item => {
    Object.assign(item, validData)
  })
}

const handelBatchClear = (): void => {
  batchData.value = JSON.parse(JSON.stringify(defaultBatchData.value))
}
// {
//   attrs: [
//     {
//       bar_code: '123',
//       brokerage: 0,
//       brokerage_two: 0,
//       cost: 2,
//       detail: {
//         "颜色": '红色',
//         "尺码": '小码'
//       },
//       ot_price: 3,
//       pic: 'https://shop',
//       price: 1,
//       stock: 4,
//       value1: '红色',
//       value2: '小码',
//       vip_price: 0,
//       volume: 6,
//       weight: 5
//     }
//   ],
//   items: [
//     {
//       value: '颜色',
//       detail: [
//         '红色',
//         '黑色',
//         '白色'
//       ]
//     },
//     {
//       value: '尺码',
//       detail: [
//         '小码',
//         '中码',
//         '大码'
//       ]
//     }
//   ],
//   header: []
// })

// 立即生成的 的结果返回
// data: {
//   attr: [
//     { value: '内存', detail: ['6G', '8G'] },
//     { value: '硬盘', detail: ['64G', '128G', '256G'] }
//   ],
//   header: [
//     { align: 'center', key: 'value1', minWidth: 130, title: '内存' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '硬盘' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '图片', slot: 'pic' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '售价', slot: 'price' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '成本价', slot: 'cost' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '原价', slot: 'ot_price' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '库存', slot: 'stock' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '产品编号', slot: 'bar_code' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '重量(KG)', slot: 'weight' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '体积(m³)', slot: 'volume' },
//     { align: 'center', key: 'value2', minWidth: 130, title: '体积', slot: 'action' }
//   ],
//   value: [
//     {
//       bar_code: '',
//       brokerage: 0,
//       brokerage_two: 0,
//       cost: 0,
//       detail: {
//         "内存": '6G',
//         "硬盘": '128G'
//       },
//       ot_price: 0,
//       pic: '',
//       price: 0,
//       stock: 0,
//       value1: '6G',
//       value2: '128G',
//       vip_price: 0,
//       volume: 0,
//       weight: 0
//     },
//     {
//       bar_code: '',
//       brokerage: 0,
//       brokerage_two: 0,
//       cost: 0,
//       detail: {
//         "内存": '8G',
//         "硬盘": '256G'
//       },
//       ot_price: 0,
//       pic: '',
//       price: 0,
//       stock: 0,
//       value1: '8G',
//       value2: '256G',
//       vip_price: 0,
//       volume: 0,
//       weight: 0
//     }
//   ]
// }
</script>

<style lang="scss" scoped>
.el-tag {
  margin-right: 5px;
}
</style>./AttrTable.vue
