<template>
  <div class="w-full h-full flex justify-center div-solve">
    <div v-if="!isPlotHoroscope" class="mt-6 mb-12">
      <p v-if="!isLoadedFail" class="font-semibold text-2xl">
        Đang tải lá số tử vi.
      </p>
      <p v-else class="font-semibold text-2xl">
        Không tìm thấy lá số tử vi hoặc bạn không có quyền truy cập.
      </p>
    </div>
    <div v-else class="mb-24 mx-1 md:mx-6 overflow-hidden">
      <div class="my-6 w-full flex justify-center">
        <p class="font-semibold text-2xl">Lá số tử vi</p>
      </div>
      <div class="flex justify-center w-full">
        <horoscope-grid class="w-full" :transmit-form-data="dataHoroscope" />
      </div>
      <div class="flex justify-center mt-20">
        <p class="font-semibold text-3xl text-purple">Luận giải chi tiết</p>
      </div>
      <div v-if="isSolveHoroscope">
        <div class="my-12 w-full flex justify-center">
          <p class="font-semibold text-2xl">Lu&#7853;n gi&#7843;i t&#7893;ng</p>
        </div>
        <HoroscopeSolve class="font-semibold text-xl" :solve-data="dataSolve" />
      </div>
      <div v-else class="mt-12 mb-12">
        <p class="font-semibold text-xl">
          Lá số này chưa được luận giải, vui lòng luận giải để xem thông tin chi
          tiết.
        </p>
      </div>
      <div class="flex justify-center">
        <p class="font-semibold text-3xl text-purple my-10">
          Luận giải năm {{ yearSolve ? ` - ${yearSolve}` : '' }}
        </p>
      </div>
      <div v-if="isSolveYearHoroscope">
        <HoroscopeSolve
          class="font-semibold text-xl"
          :solve-data="dataSolveYear"
        />
      </div>
      <div v-else class="mt-12 mb-12">
        <p class="font-semibold text-xl">Lá số này chưa có luận giải năm.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { AxiosInstance } from 'axios'
import HoroscopeGrid from '~/components/horoscope/grid.vue'
import HoroscopeSolve from '~/components/horoscope/solve.vue'
import type { HoroscopeData } from '~/types/horoscope'
const isPlotHoroscope = ref(false)
const isSolveHoroscope = ref(false)
const isSolveYearHoroscope = ref(false)
const isLoadedFail = ref(false)

const loadingInstance = ref<LoadingInstance | null>(null)
const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
const route = useRoute()
const horoscopeId = route.params.id

useHead({
  title: horoscopeId === '1' ? 'Lá số tử vi mẫu' : 'Lá số tử vi đã lưu',
  meta: [
    {
      name: 'description',
      content:
        horoscopeId === '1'
          ? 'Xem lá số tử vi mẫu với phần luận giải tổng quan và luận giải vận hạn theo năm trên Tử Vi Thiên Mã.'
          : 'Lá số tử vi cá nhân đã lưu trên Tử Vi Thiên Mã.',
    },
    {
      name: 'robots',
      content: horoscopeId === '1' ? 'index, follow' : 'noindex, nofollow',
    },
    {
      property: 'og:title',
      content:
        horoscopeId === '1'
          ? 'Lá số tử vi mẫu | Tử Vi Thiên Mã'
          : 'Lá số tử vi đã lưu | Tử Vi Thiên Mã',
    },
    {
      property: 'og:description',
      content:
        horoscopeId === '1'
          ? 'Tham khảo lá số tử vi mẫu và cách luận giải vận hạn theo năm.'
          : 'Lá số tử vi cá nhân đã lưu.',
    },
  ],
})

onMounted(() => {
  getSolveHoroscope()
})

const dataHoroscope = ref<HoroscopeData>({
  name: '',
  is_male: '',
  date: '',
  time: '',
  year: '',
  data: {
    body: '',
    chineseDate: '',
    earthlyBranchOfBodyPalace: '',
    earthlyBranchOfSoulPalace: '',
    fiveElementsClass: '',
    gender: '',
    palaces: [],
    rawDates: {
      lunarDate: {
        lunarDay: '',
        lunarMonth: '',
        lunarYear: '',
      },
    },
    sign: '',
    solarDate: '',
    soul: '',
    time: '',
    timeRange: '',
    zodiac: '',
  },
})
const dataSolve = ref('')
const dataSolveYear = ref('')
const yearSolve = ref('')

const getSolveHoroscope = async () => {
  try {
    const res: any = await callGetHoroscopeById(horoscopeId as string, 1)
    if (res.data?.solveData) {
      isSolveHoroscope.value = true
      dataSolve.value = res.data?.solveData || ''
    }

    const resYear: any = await callGetHoroscopeById(horoscopeId as string, 2)
    if (resYear.data?.solveData) {
      isSolveYearHoroscope.value = true
      yearSolve.value = resYear.data?.currentSolarYear || ''
      dataSolveYear.value = resYear.data?.solveData || ''
    }

    setTimeout(() => {
      isPlotHoroscope.value = true
      dataHoroscope.value = { ...res }
    }, 500) // Chỗ setTimeout này để fix bug đường kẻ tam hợp bị lệch do scroll render sau
  } catch (e) {
    console.log(e)
    ElMessage({
      message: (e as Error).message,
      type: 'error',
    })
  } finally {
    setTimeout(() => {
      isLoadedFail.value = true
    }, 500)
  }
}
</script>
