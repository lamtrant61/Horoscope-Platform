<script lang="ts" setup>
const { awesome } = useAppConfig()

// definePageMeta({ layout: 'page' })
useHead({
  titleTemplate: '',
  title: 'Tử Vi Thiên Mã - Lập lá số tử vi online, luận giải tử vi bằng AI',
  meta: [
    {
      name: 'description',
      content:
        awesome.description ||
        'Lập lá số tử vi online và luận giải tử vi trọn đời, vận hạn từng năm, tình duyên, sự nghiệp, tài lộc, sức khỏe bằng AI.',
    },
    {
      property: 'og:title',
      content:
        'Tử Vi Thiên Mã - Lập lá số tử vi online, luận giải tử vi bằng AI',
    },
    {
      property: 'og:description',
      content:
        awesome.description ||
        'Lập lá số tử vi online và luận giải tử vi trọn đời, vận hạn từng năm bằng AI.',
    },
  ],
})
</script>

<template>
  <AwesomeWelcome :with-alert="true" />
</template>
