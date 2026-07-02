<script lang="ts" setup>
const { awesome } = useAppConfig()
const route = useRoute()

const siteName = awesome.name || 'Tử Vi Thiên Mã'
const siteUrl = awesome.website || 'https://tuvithienma.com'
const description =
  awesome.description ||
  'Lập lá số tử vi online và luận giải tử vi trọn đời, vận hạn từng năm bằng AI.'
const canonicalUrl = computed(() => new URL(route.path, siteUrl).toString())
const logoUrl = computed(() =>
  new URL(awesome.logo || '/logo.png', siteUrl).toString(),
)

useHead({
  htmlAttrs: {
    lang: 'vi',
  },
  title: siteName,
  titleTemplate: (title) =>
    title && title !== siteName ? `${title} | ${siteName}` : siteName,
  link: [{ rel: 'canonical', href: canonicalUrl }],
  meta: [
    { name: 'robots', content: 'index, follow' },
    {
      name: 'description',
      content: description,
    },
    { name: 'keywords', content: awesome.keywords },
    { property: 'og:locale', content: 'vi_VN' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteName },
    { property: 'og:title', content: siteName },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:image', content: logoUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: siteName },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: logoUrl },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: siteName,
        url: siteUrl,
        inLanguage: 'vi-VN',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        description,
        image: logoUrl.value,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'VND',
        },
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: siteUrl,
        inLanguage: 'vi-VN',
        description,
      }),
    },
  ],
})
</script>

<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950"
  >
    <NuxtLayout>
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
