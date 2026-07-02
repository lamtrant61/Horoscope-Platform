<template>
  <div
    class="w-full mx-4 mt-[-40px] min-h-screen text-white flex items-center justify-center"
  >
    <div
      class="w-full max-w-md p-6 rounded-2xl border-black border-2 shadow-lg"
      :style="{
        backgroundColor: nuxtColorMode === 'dark' ? '#161b22' : 'white',
        color: nuxtColorMode === 'dark' ? 'white' : 'black',
      }"
    >
      <h2 class="text-3xl font-bold text-center mb-6">
        <span :style="{ color: nuxtColorMode === 'dark' ? 'white' : 'black' }"
          >Tử vi thiên mã</span
        >
      </h2>

      <!-- Tabs -->
      <div class="flex mb-6 border-b border-gray-600">
        <button
          :class="currentTab === 'login' ? activeTabClass : inactiveTabClass"
          class="w-1/2 text-center py-2 font-semibold"
          :style="{ color: nuxtColorMode === 'dark' ? 'white' : 'black' }"
          @click="currentTab = 'login'"
        >
          Đăng nhập
        </button>
        <button
          :class="currentTab === 'register' ? activeTabClass : inactiveTabClass"
          class="w-1/2 text-center py-2 font-semibold"
          :style="{ color: nuxtColorMode === 'dark' ? 'white' : 'black' }"
          @click="currentTab = 'register'"
        >
          Đăng ký
        </button>
      </div>

      <!-- Login Form -->
      <form
        v-if="currentTab === 'login'"
        class="space-y-4"
        @submit.prevent="onLogin"
      >
        <input
          v-model="userLogin"
          type="text"
          placeholder="Tên đăng nhập"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <input
          v-model="passLogin"
          type="password"
          placeholder="Mật khẩu"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <button
          type="submit"
          class="form-button bg-green-500 hover:bg-green-600"
        >
          Đăng nhập
        </button>
      </form>

      <!-- Register Form -->
      <form v-else class="space-y-4" @submit.prevent="onRegister">
        <input
          v-model="nameRegister"
          type="text"
          placeholder="Họ và tên"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <input
          v-model="userRegister"
          type="text"
          placeholder="Tên đăng nhập"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <input
          v-model="passRegister"
          type="password"
          placeholder="Mật khẩu"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <input
          v-model="retypePassRegister"
          type="password"
          placeholder="Nhập lại mật khẩu"
          class="form-input"
          :style="{
            backgroundColor: nuxtColorMode === 'dark' ? '#0d1117' : 'white',
          }"
        />
        <button
          type="submit"
          class="form-button bg-purple-500 bg-green-500 hover:bg-green-600"
        >
          Đăng ký
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

useHead({
  title: 'Đăng nhập',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const router = useRouter()
const { $api } = useNuxtApp() as unknown as { $api: AxiosInstance }
const { $bus } = useNuxtApp() as unknown as {
  $bus: {
    emit: (event: string, payload?: any) => void
    on: (event: string, callback: (...args: any[]) => void) => void
  }
}

// get storage
const nuxtColorMode = ref('dark')
onMounted(() => {
  // check user login redirect to homepage
  const user = localStorage.getItem('user')
  if (user) {
    router.push('/')
  }

  nuxtColorMode.value = localStorage.getItem('nuxt-color-mode') || 'dark'
  $bus.on('change-theme', (key) => {
    nuxtColorMode.value = key
  })
})

const route = useRoute()
const currentTab = ref((route.query.tab as string) || 'login')

const userLogin = ref('')
const passLogin = ref('')

const nameRegister = ref('')
const userRegister = ref('')
const passRegister = ref('')
const retypePassRegister = ref('')

// Theo dõi thay đổi query để cập nhật tab khi chuyển link
watch(
  () => route.query.tab,
  (val) => {
    if (val) currentTab.value = val as string
  },
)
const onLogin = () => {
  $api
    .post('/login', {
      username: userLogin.value,
      password: passLogin.value,
    })
    .then((res: any) => {
      localStorage.setItem('user', JSON.stringify(res.data))
      ElMessage({
        message: 'Đăng nhập thành công.',
        type: 'success',
      })
      router.push('/lasotuvi').then(() => {
        window.location.reload()
      })
    })
}

const onRegister = () => {
  if (passRegister.value !== retypePassRegister.value) {
    ElMessage({
      message: 'Mật khẩu nhập lại không trùng nhau.',
      type: 'error',
    })
    return
  }
  $api
    .post('/register', {
      name: nameRegister.value,
      username: userRegister.value,
      password: passRegister.value,
    })
    .then((res: any) => {
      ElMessage({
        message: 'Đăng ký thành công.',
        type: 'success',
      })
      setTimeout(() => {
        currentTab.value = 'login'
      }, 1500)
    })
}

const activeTabClass = 'border-b-2 border-violet-500 text-violet-400'
const inactiveTabClass =
  'border-b-2 border-transparent text-gray-400 hover:text-purple-300'
</script>

<style scoped>
.form-input {
  @apply w-full p-3 rounded border border-gray-600 
    focus:outline-none focus:ring-2 focus:ring-green;
}
.form-button {
  @apply w-full text-white py-3 rounded font-bold;
}
</style>
