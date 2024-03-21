/* eslint-disable @typescript-eslint/explicit-function-return-type */
import request from '@/utils/request'
import type { IListParams, IListResult, ICreateAdminData } from './types/admin'
import type { IFormData } from './types/form'
// 获取管理员列表
export const getAdmin = async (params: IListParams) => {
  // return await request<IListResult>({
  //   method: 'GET',
  //   url: '/setting/admin',
  //   params
  // })
  console.log(params)
  return {
    list: [{
      count: 100,
      id: 1,
      account: 'string',
      head_pic: 'string',
      pwd: 'string',
      real_name: 'string',
      roles: '财务,运营,财务',
      last_ip: 'string',
      last_time: '2024-3-19 20:10:20',
      add_time: '2024-3-19 20:10:20',
      login_count: 1,
      level: 1,
      status: 1,
      is_del: 1,
      _add_time: 'string',
      _last_time: 'string',
      statusLoading: false
    }]
  } as unknown as IListResult
}

// 创建管理员
export const createAdmin = async (data: ICreateAdminData) => {
  return await request({
    method: 'POST',
    url: '/setting/admin',
    data
  })
}

// 修改管理员
export const updateAdmin = async (id: number, data: ICreateAdminData) => {
  return await request({
    method: 'PUT',
    url: `/setting/admin/${id}`,
    data
  })
}

// 删除管理员
export const delAdmin = async (id: number) => {
  return await request({
    method: 'DELETE',
    url: `/setting/admin/${id}`
  })
}

// 修改管理员状态
export const updateAdminStatus = async (id: number, status: number) => {
  return await request({
    method: 'PUT',
    url: `/setting/set_status/${id}/${status}`
  })
}

// 获取管理员的信息
export const getRoles = async () => {
  return await request<IFormData>({
    method: 'GET',
    url: '/setting/admin/create'
  }).then(data => {
    const roles = data.rules.find(item => item.field === 'roles')

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (roles?.options) {
      return roles.options
    }
  })
}
