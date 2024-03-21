/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import router from '@/router/'
import { store } from '@/store'
import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

// baseURL 由于环境不同对于的域名地址也不同，需要进行配置
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
})

// request  不支持泛型
// request.get post put 支持响应数据泛型
// 由于我们的后端又包装了一层数据 data，导致我们访问数据比较麻烦，所以我们自己又封装了一个 request

// 请求拦截器 Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 统一设置用户身份 token
  const user = store.state.user
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  return config
}, async function (error) {
  // Do something with request error
  return await Promise.reject(error)
})

// 控制登录过期的锁
let isRefreshing = false

// 相应拦截器 Add a response interceptor
request.interceptors.response.use(async function (response) {
  // 统一处理接口相应错误，比如 token 过期无效，服务端异常等。因为登录过期 status 不为 ，所以要做处理
  const status = response.data.status

  // 正常情况下
  if (!status && status === 200) {
    return response
  }
  // 错误情况：比如 token 失效...
  if (status === 410000) {
    // 如果正在处理，则直接return
    if (isRefreshing) return await Promise.reject(response)
    isRefreshing = true // 状态变更，已有正常的处理的情况，后续的直接return
    // 清除本地过期的登录状态
    // 跳转登录页面
    // 抛出异常
    ElMessageBox.confirm('您的登录已过期，您可以取消停留在此页面，或确认重新登录', '登录过期', {
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    }).then(() => {
      // 清除本地过期登录状态
      // 跳转页面
      router.push({
        name: 'login',
        query: {
          redirect: router.currentRoute.value.fullPath
        }
      }).catch(() => {})
    }).catch(() => {}).finally(() => {
      // 重置状态
      isRefreshing = false
    })
    // 在内部消化掉这个业务异常 - 不执行后续的操作
    return await Promise.reject(response)
  }
  // 其他情况
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  ElMessage.error(response.data.msg || '请求失败，联系管理员')
  return await Promise.reject(response.data)
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return await Promise.reject(error)
})

export default async <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return await request(config).then(res => {
    return res.data as T
  })
}
