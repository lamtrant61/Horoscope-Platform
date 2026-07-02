<template>
  <div v-show="!isPlotHoroscope" class="w-full flex justify-center">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      :size="formSize"
      label-width="auto"
      class="pl-1 pr-3 py-6 border-2 rounded-3xl w-11/12 md:w-full mx-2 md:mx-0 md:pl-8 md:pr-8 md:py-8"
      @submit.prevent="onSubmit(ruleFormRef)"
    >
      <client-only>
        <el-form-item class="form-item-class input-form" prop="name">
          <template #label>
            <p
              :style="{
                color: nuxtColorMode === 'dark' ? 'white' : 'black',
              }"
            >
              Họ và tên:
            </p>
          </template>
          <el-input
            v-model="ruleForm.name"
            placeholder="Nhập họ và tên"
            clearable
          />
        </el-form-item>
        <el-form-item
          class="form-item-class input-form"
          label="Giới tính:"
          prop="is_male"
        >
          <template #label>
            <p
              :style="{
                color: nuxtColorMode === 'dark' ? 'white' : 'black',
              }"
            >
              Giới tính:
            </p>
          </template>
          <el-select
            v-model="ruleForm.is_male"
            placeholder="Chọn giới tính"
            clearable
          >
            <el-option label="Nam" value="1" />
            <el-option label="Nữ" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item
          class="form-item-class input-form"
          label="Ngày giờ sinh:"
          prop="date"
        >
          <template #label>
            <div class="flex flex-col">
              <p
                :style="{
                  color: nuxtColorMode === 'dark' ? 'white' : 'black',
                }"
              >
                Ngày giờ sinh:
              </p>
              <span
                class="text-xs"
                :style="{
                  color: nuxtColorMode === 'dark' ? 'white' : 'black',
                }"
              >
                (Dương lịch)
              </span>
            </div>
          </template>
          <el-col :span="12">
            <el-form-item prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="date"
                placeholder="Ngày sinh"
                style="width: 100%"
                format="YYYY-MM-DD"
                clearable
              />
            </el-form-item>
          </el-col>

          <el-col :span="2" class="text-center">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="time">
              <el-time-select
                v-model="ruleForm.time"
                style="width: 100%"
                start="00:00"
                step="00:30"
                end="23:59"
                placeholder="Giờ sinh"
                format="HH:mm"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          class="form-item-class input-form"
          label="Năm xem:"
          prop="year"
        >
          <template #label>
            <p
              :style="{
                color: nuxtColorMode === 'dark' ? 'white' : 'black',
              }"
            >
              Năm xem:
            </p>
          </template>
          <el-date-picker
            v-model="ruleForm.year"
            style="width: 100%"
            type="year"
            placeholder="Chọn năm xem"
            format="YYYY"
            value-format="YYYY"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-container class="flex justify-end">
            <el-button type="primary" native-type="submit">Lập lá sô</el-button>
            <el-button>Hủy</el-button>
          </el-container>
        </el-form-item>
      </client-only>
    </el-form>
  </div>
  <div
    v-if="isPlotHoroscope"
    class="w-full flex flex-col justify-center items-center"
  >
    <horoscope-grid :transmit-form-data="dataHoroscope" />
    <div>
      <el-button class="mt-4" type="primary" @click="saveHoroscope">
        Lưu lá số
      </el-button>
      <!-- <el-popconfirm
        confirm-button-text="Yes"
        cancel-button-text="No"
        :icon="InfoFilled"
        icon-color="#626AEF"
        width="250"
        title="Luận giải lá số sẽ tốn 20.000đ, bạn có muốn tiếp tục?"
        @confirm="solveHoroscope"
      >
        <template #reference>
          <el-button class="mt-4" type="primary"> Luận giải </el-button>
        </template>
      </el-popconfirm> -->
      <popup-payment :on-run="() => solveHoroscope()" />
      <el-button class="mt-4" type="primary" @click="resetHoroscope">
        Quay lại
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
// import { InfoFilled } from '@element-plus/icons-vue'
import HoroscopeGrid from './grid.vue'
import type { HoroscopeForm, HoroscopeData } from '~/types/horoscope'
import popupPayment from '~/components/payment/popupPayment.vue'

const router = useRouter()
const { $bus } = useNuxtApp() as unknown as {
  $bus: {
    emit: (event: string, payload?: any) => void
    on: (event: string, callback: (...args: any[]) => void) => void
  }
}
// import bgUrl from '~/assets/logo/bg.png'

const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
// get storage
const nuxtColorMode = ref('dark')
onMounted(() => {
  nuxtColorMode.value = localStorage.getItem('nuxt-color-mode') || 'dark'
  $bus.on('change-theme', (key) => {
    nuxtColorMode.value = key
  })
})

const isPlotHoroscope = ref(false)
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

const formSize = ref<ComponentSize>('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<HoroscopeForm>({
  name: '',
  is_male: '1',
  date: '',
  time: '',
  year: new Date().getFullYear().toString(),
})
const rules = reactive<FormRules<HoroscopeForm>>({
  name: [{ required: true, message: 'Nhập họ và tên', trigger: 'blur' }],
  is_male: [{ required: true, message: 'Chọn giới tính', trigger: 'change' }],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Chọn ngày sinh',
      trigger: 'change',
    },
  ],
  time: [
    {
      required: true,
      message: 'Chọn giờ sinh',
      trigger: 'change',
    },
  ],
  year: [
    {
      type: 'date',
      required: true,
      message: 'Chọn năm xem',
      trigger: 'change',
    },
  ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      getHoroscope()
    } else {
      console.log('error submit!', fields)
    }
  })
}
const convertDateFormat = (date: string) => {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = d.getMonth() + 1
  const day = d.getDate()
  const formatted = `${y}-${m}-${day}` // YYYY-M-D
  return formatted
}

const getHoroscope = async () => {
  const dataFetch = {
    ...ruleForm,
    time: parseInt(ruleForm.time.substring(0, 2)).toString(),
  }
  dataFetch.date = convertDateFormat(dataFetch.date)
  const res: any = await callGetHoroscope(dataFetch)
  isPlotHoroscope.value = true
  dataHoroscope.value = { ...ruleForm, ...res }
}

const saveHoroscope = async () => {
  const dataSave = {
    ...ruleForm,
    time: parseInt(ruleForm.time.substring(0, 2)).toString(),
  }
  dataSave.date = convertDateFormat(dataSave.date)

  // call api to save dataHoroscope
  const res: any = await callSaveHoroscope(dataSave)
  if (!res.error_code) {
    ElMessage({
      message: res.message || 'Lưu lá số thành công',
      type: 'success',
    })
  }
}
const solveHoroscope = async () => {
  try {
    const dataSave = {
      ...ruleForm,
      time: parseInt(ruleForm.time.substring(0, 2)).toString(),
    }
    dataSave.date = convertDateFormat(dataSave.date)
    // Phải có để ko ElMessage ra thanh công khi lưu
    // call api to save dataHoroscope
    const resData: any = await callSaveHoroscope(dataSave)
    const idHoroscope = resData?.data?.id
    if (!idHoroscope)
      throw new Error(
        'Có lỗi xảy ra khi luận giải lá số, vui lòng liên hệ quản trị viên để được hỗ trợ',
      )
    setTimeout(async () => {
      const res: any = await callSolveHoroscope({ id: idHoroscope })
      if (res.error_code) {
        throw new Error(
          res.message ||
            'Có lỗi xảy ra khi luận giải lá số, vui lòng liên hệ quản trị viên để được hỗ trợ',
        )
      }
      router.push(`/horoscope/solve/${idHoroscope}`).then(() => {
        window.location.reload()
      })
    }, 200)
  } catch (e) {
    ElMessage({
      message: (e as Error).message,
      type: 'error',
    })
  }
}
const resetHoroscope = () => {
  isPlotHoroscope.value = false
  dataHoroscope.value = {
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
  }
}
</script>
<style scoped>
.form-item-class {
  margin-bottom: 25px;
}
.input-form {
  opacity: 0.8;
}
::v-deep .el-form-item--label-right .el-form-item__label {
  font-weight: 600;
  font-size: 16px;
}
</style>
