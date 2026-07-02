import type { AxiosInstance } from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
const loadingInstance = ref<LoadingInstance | null>(null)

export const openFullScreen = () => {
  loadingInstance.value = ElLoading.service({
    lock: true,
    text: 'Đang tải dữ liệu, quá trình này có thể diễn ra trong ít phút (2-5 phút), vui lòng chờ đợi...',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'el-loading-custom', // thêm custom class
  })
}

export const closeFullScreen = () => {
  if (loadingInstance.value) {
    loadingInstance.value.close()
    loadingInstance.value = null
  }
}

export const callSaveHoroscope = (data: any) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    $api
      .post('/horoscope/save', {
        ...data,
      })
      .then((res: any) => {
        if (res.error_code) {
          reject(new Error('Có lỗi xảy ra khi lưu lá số tử vi'))
        }
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
export const callSolveHoroscope = (data: any) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    $api
      .post('/openai', {
        id: data.id,
      })
      .then((res: any) => {
        if (res.error_code) {
          reject(new Error('Có lỗi xảy ra khi lưu lá số tử vi'))
        }
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
export const callSolveHoroscopeYear: any = (data: any) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    $api
      .post('/openai/year', {
        id: data.id,
      })
      .then((res: any) => {
        if (res.error_code) {
          reject(new Error('Có lỗi xảy ra khi lưu lá số tử vi'))
        }
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
export const callGetHoroscope = (dataFetch: any) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    // call api with body: ruleForm
    $api
      .post('/horoscope', {
        ...dataFetch,
      })
      .then((res: any) => {
        if (res.error_code)
          reject(new Error('Có lỗi xảy ra khi tạo lá số tử vi'))
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
export const callGetHoroscopeById = (horoscopeId: string, type = 1) => {
  const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
  return new Promise((resolve, reject) => {
    openFullScreen()
    // call api with body: ruleForm
    $api
      .post('/openai/solve', {
        id: horoscopeId,
        type,
      })
      .then((res: any) => {
        if (res.error_code)
          reject(new Error('Có lỗi xảy ra khi tạo lá số tử vi'))
        resolve(res)
      })
      .finally(() => {
        closeFullScreen()
      })
  })
}
