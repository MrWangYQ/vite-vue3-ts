/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '@/utils/request'
// import type { IListParams, IListResult, ICreateAdminData } from './types/admin'
// import type { IFormData } from './types/form'

// 创建管理员
export const saveProduct = async (type: number, data: any) => {
  return await request({
    method: 'POST',
    url: `/product/save${type}`,
    data
  })
}

export const getCategoryTree = async (type: number) => {
  return await request({
    method: 'POST',
    url: `/product/getCategoryTree/${type}`
  })
}

export const getAttrs = async () => {
  return await request({
    method: 'POST',
    url: '/product/getAttrs'
  })
}

export const generateAttr = async (single: number, multi: number, data: any) => {
  // return await request({
  //   method: 'POST',
  //   url: '/product/generate',
  //   data
  // })
  console.log(single, multi, data)
  return await Promise.resolve({
    attr: [
      { value: '内存', detail: ['6G', '8G'] },
      { value: '硬盘', detail: ['64G', '128G', '256G'] }
    ],
    header: [
      { align: 'center', key: 'value1', minWidth: 80, title: '内存' },
      { align: 'center', key: 'value2', minWidth: 80, title: '硬盘' },
      { align: 'center', minWidth: 80, title: '图片', slot: 'pic' },
      { align: 'center', minWidth: 80, title: '售价', slot: 'price' },
      { align: 'center', minWidth: 80, title: '成本价', slot: 'cost' },
      { align: 'center', minWidth: 80, title: '原价', slot: 'ot_price' },
      { align: 'center', minWidth: 80, title: '库存', slot: 'stock' },
      { align: 'center', minWidth: 80, title: '产品编号', slot: 'bar_code' },
      { align: 'center', minWidth: 80, title: '重量(KG)', slot: 'weight' },
      { align: 'center', minWidth: 80, title: '体积(m³)', slot: 'volume' },
      { align: 'center', minWidth: 80, title: '体积', slot: 'action' }
    ],
    value: [
      {
        bar_code: '',
        brokerage: 0,
        brokerage_two: 0,
        cost: 0,
        detail: {
          内存: '6G',
          硬盘: '128G'
        },
        ot_price: 0,
        pic: '',
        price: 0,
        stock: 0,
        value1: '6G',
        value2: '128G',
        vip_price: 0,
        volume: 0,
        weight: 0
      },
      {
        bar_code: '',
        brokerage: 0,
        brokerage_two: 0,
        cost: 0,
        detail: {
          内存: '8G',
          硬盘: '256G'
        },
        ot_price: 0,
        pic: '',
        price: 0,
        stock: 0,
        value1: '8G',
        value2: '256G',
        vip_price: 0,
        volume: 0,
        weight: 0
      }
    ]
  })
}
