import type { AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const loadingInstance = ref<LoadingInstance | null>(null)

export const callGetUserBalance = () => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    $api.get('/user/balance').then((res: any) => {
      if (res.error_code)
        reject(new Error('Không tìm thấy thông tin tài khoản'))
      resolve(res)
    })
  })
}

export const callGetUserRole = () => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    $api.get('/user/role').then((res: any) => {
      if (res.error_code)
        reject(new Error('Không tìm thấy thông tin tài khoản'))
      resolve(res)
    })
  })
}
