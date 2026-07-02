<template>
  <el-table
    class="save-horoscope-table"
    :data="tableData"
    style="width: 100%"
    border
  >
    <el-table-column label="Họ và tên" align="center">
      <template #default="scope">
        <div class="flex flex-col">
          <p class="text-base font-bold">{{ scope.row.name }}</p>
          <el-text v-if="scope.row.isSolve == 1" type="primary"
            >(Đã luận giải)</el-text
          >
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Giới tính" align="center" min-width="70">
      <template #default="scope">
        <p>{{ scope.row.is_male === '1' ? 'Nam' : 'Nữ' }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Ngày sinh (Dương lịch)" align="center">
      <template #default="scope">
        <p>{{ scope.row.date }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Giờ sinh" align="center" min-width="70">
      <template #default="scope">
        <p>{{ scope.row.time }}</p>
      </template>
    </el-table-column>
    <el-table-column label="Hành động" align="center">
      <template #default="scope">
        <div class="w-full flex flex-col justify-center items-center">
          <el-button
            class="w-16 my-1"
            style="margin-left: 0px !important"
            size="small"
            type="success"
            @click="getSolve(scope.$index, scope.row)"
          >
            Xem
          </el-button>
          <!-- <el-popconfirm
            v-if="!(scope.row.isSolve == 1)"
            width="200"
            title="Luận giải lá số sẽ tốn 20.000đ, bạn có muốn tiếp tục?"
            confirm-button-text="Có"
            cancel-button-text="Không"
            @confirm="handleSolve(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button
                class="w-16 my-1"
                style="margin-left: 0px !important"
                size="small"
                type="primary"
              >
                Luận giải
              </el-button>
            </template>
          </el-popconfirm> -->
          <popup-payment
            v-if="!(scope.row.isSolve == 1)"
            :on-run="() => handleSolve(scope.$index, scope.row)"
          />
          <popup-payment-year
            v-if="!(scope.row.isSolve == 1)"
            :on-run="() => handleSolveYear(scope.$index, scope.row)"
          />
          <el-popconfirm
            width="200"
            title="Bạn có chắc chắn muốn xóa lá số này?"
            confirm-button-text="Có"
            cancel-button-text="Không"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button
                class="w-16 my-1"
                style="margin-left: 0px !important"
                size="small"
                type="danger"
              >
                Xóa
              </el-button>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:current-page="page"
    v-model:page-size="limit"
    class="mt-4"
    :page-sizes="[10, 20, 50, 100]"
    :size="size"
    :disabled="false"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="getHoroscopeData"
    @current-change="getHoroscopeData"
  />
</template>

<script lang="ts" setup>
import type { AxiosInstance } from 'axios'
import { onMounted, ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { ElMessage } from 'element-plus'
import popupPayment from '~/components/payment/popupPayment.vue'
import popupPaymentYear from '~/components/payment/popupPaymentYear.vue'

const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
const size = ref<ComponentSize>('default')
const router = useRouter()

interface Horoscope {
  id: number
  name: string
  is_male: number
  date: string
  time: string
}
const page = ref(1)
const limit = ref(20)
const total = ref(0)
const tableData = ref<Horoscope[]>([])

onMounted(() => {
  getHoroscopeData()
})

const getHoroscopeData = () => {
  tableData.value = []
  $api
    .get('/horoscope/save', {
      params: {
        page: page.value,
        limit: limit.value,
      },
    })
    .then((response) => {
      const horoscopeData = response.data.list as Horoscope[]
      total.value = response.data.total as number
      tableData.value.push(...horoscopeData)
    })
}

const handleDelete = (index: number, row: Horoscope) => {
  $api.delete(`/horoscope/save/${row.id}`).then((response) => {
    ElMessage({
      message: 'Xóa lá số tử vi thành công',
      type: 'success',
    })
    getHoroscopeData()
  })
}
const handleSolve = async (index: number, row: Horoscope) => {
  const res: any = await callSolveHoroscope({ id: row.id })
  if (res.error_code) {
    ElMessage({
      message: res.message || 'Có lỗi xảy ra',
      type: 'error',
    })
  }
  router.push(`/horoscope/solve/${row.id}`).then(() => {
    window.location.reload()
  })
}

const handleSolveYear = async (index: number, row: Horoscope) => {
  const res: any = await callSolveHoroscopeYear({ id: row.id })
  if (res.error_code) {
    ElMessage({
      message: res.message || 'Có lỗi xảy ra',
      type: 'error',
    })
  }
  router.push(`/horoscope/solve/${row.id}`).then(() => {
    window.location.reload()
  })
}
const getSolve = (index: number, row: Horoscope) => {
  router.push(`/horoscope/solve/${row.id}`)
}
</script>
<style scoped>
.save-horoscope-table >>> .horoscope-popup-payment {
  margin: 0px !important;
  width: 4rem !important;
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}
</style>
