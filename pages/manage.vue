<template>
  <div class="w-full flex flex-col px-12 py-12">
    <div class="w-full flex justify-between items-center">
      <el-radio-group v-model="tabValue" @change="changeTab">
        <el-radio value="1" size="large">User</el-radio>
        <el-radio value="2" size="large">Payment</el-radio>
      </el-radio-group>
      <el-input
        v-model="searchValue"
        style="width: 180px"
        placeholder="Search here..."
        @input="debouncedSearch"
      />
    </div>

    <div v-if="tabValue === '1'" class="w-full">
      <el-table
        :key="tableKey"
        class="mt-4"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column label="Name" align="center">
          <template #default="scope">
            <p>{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Username" align="center" min-width="70">
          <template #default="scope">
            <p>{{ scope.row.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Role" align="center">
          <template #default="scope">
            <p>{{ scope.row.role }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Balance" align="center" min-width="70">
          <template #default="scope">
            <p>{{ scope.row.balance.toLocaleString('vi-VN') }}₫</p>
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
        @size-change="getUserList"
        @current-change="getUserList"
      />
    </div>
    <div v-else class="w-full">
      <el-table
        :key="tableKey"
        class="mt-4"
        :data="tableData"
        style="width: 100%"
        border
      >
        <el-table-column label="Username" align="center" min-width="70">
          <template #default="scope">
            <p>{{ scope.row.user.username }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Payment_ID" align="center">
          <template #default="scope">
            <p>{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="Amount" align="center" min-width="70">
          <template #default="scope">
            <p>{{ scope.row.amount.toLocaleString('vi-VN') }}₫</p>
          </template>
        </el-table-column>
        <el-table-column label="Content" align="center">
          <template #default="scope">
            <p>{{ `TVTM${scope.row.content.split('TVTM')[1]}TVTM` }}</p>
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
        @size-change="getPaymentList"
        @current-change="getPaymentList"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { ComponentSize } from 'element-plus'
import { ElMessage } from 'element-plus'
import debounce from 'lodash/debounce'

useHead({
  title: 'Quản trị',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const { $api } = useNuxtApp() as unknown as { $api: any }

const tabValue = ref('1')
const tableData = ref([])
const tableKey = ref(0)
const searchValue = ref('')
const size = ref<ComponentSize>('default')
const page = ref(1)
const limit = ref(20)
const total = ref(0)

onBeforeMount(async () => {
  const user: any = await callGetUserRole()
  if (!user || user.error_code || user.data.role !== 'admin') {
    window.location.href = '/'
  }
})

onMounted(() => {
  if (tabValue.value === '1') {
    getUserList()
  } else {
    getPaymentList()
  }
})
const getUserList = () => {
  tableData.value = []
  $api
    .get('/manage/user', {
      params: {
        q: searchValue.value,
        page: page.value,
        limit: limit.value,
      },
    })
    .then((response: any) => {
      if (response.error_code) {
        ElMessage.error(response.message || 'Lấy danh sách người dùng thất bại')
        return
      }
      const userData = response.data.list as []
      total.value = response.data.total
      tableData.value = [...userData]
      tableKey.value += 1
    })
}

const getPaymentList = () => {
  tableData.value = []
  $api
    .get('/manage/payment', {
      params: {
        q: searchValue.value,
        page: page.value,
        limit: limit.value,
      },
    })
    .then((response: any) => {
      if (response.error_code) {
        ElMessage.error(response.message || 'Lấy danh sách thanh toán thất bại')
        return
      }
      const paymentData = response.data.list as []
      total.value = response.data.total
      tableData.value = [...paymentData]
      tableKey.value += 1
    })
}
const debouncedSearch = debounce(() => {
  if (tabValue.value === '1') {
    getUserList()
  } else {
    getPaymentList()
  }
}, 1500)

const changeTab = (tab: any) => {
  searchValue.value = ''
  page.value = 1
  limit.value = 20
  total.value = 0
  tableData.value = []
  console.log(tab, 'wtf')

  if (tab === '1') {
    getUserList()
  } else {
    getPaymentList()
  }
}
</script>
