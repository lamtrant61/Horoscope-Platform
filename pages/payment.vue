<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-11/12 md:w-2/3 mt-12">
      <p class="text-4xl font-extrabold text-center">Thông tin thanh toán</p>
      <el-radio-group
        v-model="amountPayment"
        class="w-full mt-8 flex justify-center"
      >
        <el-radio
          v-for="item in options"
          :key="item.value"
          :value="item.value"
          size="large"
          border
          class="w-48 mt-2"
        >
          <div class="flex flex-col justify-center">
            <p>{{ item.label }}đ</p>
            <p>{{ `Nạp ${item.label} VNĐ` }}</p>
          </div>
        </el-radio>
      </el-radio-group>
    </div>
    <el-button class="mt-8" type="primary" plain @click="getQR"
      >Tạo QR chuyển khoản</el-button
    >
    <img
      v-if="isPlotQR"
      :src="qrLink"
      alt="QR Image"
      class="w-128 h-auto mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'

useHead({
  title: 'Thanh toán',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const router = useRouter()

const options = [
  { label: '20.000', value: 20000 },
  { label: '50.000', value: 50000 },
  { label: '100.000', value: 100000 },
  { label: '200.000', value: 200000 },
  { label: '500.000', value: 500000 },
  { label: '1.000.000', value: 1000000 },
]

const amountPayment = ref(options[0].value)
const isPlotQR = ref(false)
const qrLink = ref('')
const transactionId = ref<number | null>(null)
const listInterval: any[] = []

onBeforeUnmount(() => {
  listInterval.forEach((id) => clearInterval(id))
})

const getQR = async () => {
  try {
    const res: any = await callGetQR(amountPayment.value as number)
    qrLink.value = res.data.qrLink
    transactionId.value = res.data.transaction_id
    isPlotQR.value = true
  } catch (e) {
    console.log(e)
  } finally {
    checkPayment()
  }
}

const checkPayment = () => {
  if (!transactionId.value) {
    return ElMessage({
      message:
        'Không tìm thấy id giao dịch, vui lòng liên hệ quản trị viên để được hỗ trợ',
      type: 'error',
    })
  }

  const checkInterval = setInterval(async () => {
    const res: any = await callCheckPayment(transactionId.value as number)
    if (!res.data.status) {
      clearInterval(checkInterval)
      ElMessage({
        message: 'Thanh toán thành công',
        type: 'success',
      })
      setTimeout(() => {
        router.push('/').then(() => {
          window.location.reload()
        })
      }, 2500)
    }
  }, 5000)
  listInterval.push(checkInterval)

  setTimeout(() => {
    clearInterval(checkInterval)
    ElMessage({
      message: 'Thanh toán không thành công',
      type: 'error',
    })
    setTimeout(() => {
      window.location.reload()
    }, 2500)
  }, 180000)
}
</script>

<style scoped>
::v-deep .el-radio.is-bordered.el-radio--large {
  margin-left: 2px !important;
  margin-right: 2px !important;
  height: 70px;
}
</style>
