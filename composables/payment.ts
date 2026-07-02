import type { AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const loadingInstance = ref<LoadingInstance | null>(null)

export const callGetQR = (amount: number) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    // call api with body: ruleForm
    $api
      .post('/payment/createqr', {
        amount,
      })
      .then((res: any) => {
        if (res.error_code) reject(new Error('Có lỗi xảy ra khi tạo QR'))
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
export const callCheckPayment = (transactionId: number) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    $api
      .post('/payment/check', {
        transactionId,
      })
      .then((res: any) => {
        if (res.error_code) reject(new Error('Kiểm tra thất bại'))
        resolve(res)
      })
  })
}
