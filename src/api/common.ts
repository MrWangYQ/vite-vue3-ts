/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * 公共接口请求封装
 */
import request from '@/utils/request'
import type { ILoginInfo, ILoginResponse, IUserInfo } from './types/common'

export interface ResponseData<T = any> {
  status: number
  msg: string
  data: T
}

export const getLogInfo = async () => {
  // return await request({
  //   method: 'GET',
  //   url: '/login/info'
  // })

  // return request.get<ResponseData<{
  //   logo_square: string
  //   logo_squares: string
  // }>>('/login/info')

  // return await request.get<ResponseData<{
  //   logo_square: string
  //   logo_squares: string
  // }>>('/login/info').then(res => {
  //   return res.data
  // })

  // 以此上封装  泛型 如下：
  // 参数抽成公共类型

  return await request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}

export const getCaptcha = async () => {
  return await request<Blob>({
    method: 'GET',
    url: '/captcha_pro',
    responseType: 'blob', // 请求获取图片数据
    params: {
      stamp: Date.now()
    } // 防止请求 图片出现同一张的问题 - 清除缓存
  })
}

export const login = async (data: IUserInfo) => {
  return await request<ILoginResponse>({
    method: 'POST',
    url: '/login',
    data
  })
}

export const logout = async () => {
  return await request<ILoginResponse>({
    method: 'GET',
    url: '/setting/admin/logout'
  })
}
