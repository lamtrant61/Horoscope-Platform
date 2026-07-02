import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const handleTokenExpire = () => {
  const router = useRouter()
  const error = new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
  setTimeout(() => {
    localStorage.removeItem('user')
    router.push('/horoscope/login?tab=login')
  }, 1000)
  return handleResponseError(error)
}

const handleBalance = (response: any) => {
  const router = useRouter()
  const error = new Error(
    response.data.message || 'Số dư không đủ, vui lòng nạp thêm',
  )
  setTimeout(() => {
    router.push('/payment')
  }, 1000)
  return handleResponseError(error)
}

export default defineNuxtPlugin((nuxtApp) => {
  // Create an Axios instance with type annotation
  const api: AxiosInstance = axios.create({
    baseURL: '/api', // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Request interceptor with proper typing
  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Add authentication token or modify config here
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`
      }
    }
    return config
  })

  // Response interceptor handler
  api.interceptors.response.use(
    (response) => {
      // Handle response data here
      if (!response.data) {
        const error = new Error('No data returned from the server')
        return handleResponseError(error)
      }
      if (response.data.error_code === 3) {
        return handleTokenExpire()
      }
      if (response.data.error_code === 4) {
        return handleBalance(response)
      }
      if (response.data.error_code !== 0) {
        const error = new Error(
          response.data.message || 'Unknown error occurred',
        )
        return handleResponseError(error)
      }
      return response.data
    },
    (error) => {
      if (error?.response?.data?.error_code === 3) {
        return handleTokenExpire()
      }
      return handleResponseError(error)
    },
  )

  // Provide the Axios instance globally
  nuxtApp.provide('api', api)
})

const handleResponseError = (error: Error) => {
  ElMessage({
    message: error.message || 'Có lỗi xảy ra.',
    type: 'error',
  })
  return Promise.reject(error)
}
