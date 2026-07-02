<!-- eslint-disable vue/valid-template-root -->
<template></template>
<script lang="ts" setup>
useHead({
  title: 'Đăng xuất',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})

const router = useRouter()
localStorage.removeItem('user')
router.push('/').then(() => {
  window.location.reload()
})
</script>
