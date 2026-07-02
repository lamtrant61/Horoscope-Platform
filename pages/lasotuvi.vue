<script lang="ts" setup>
// import {
//   TabGroup,
//   TabList,
//   Tab as HeadlessUiTab,
//   TabPanels,
//   TabPanel,
// } from '@headlessui/vue'
// import { capitalize } from '~/utils/str'
// import { Size } from '~/composables'
// import { HoroscopeCreateForm } from '~/components/horoscope'
import HoroscopeCreateForm from '~/components/horoscope/index.vue'
import HoroscopeSaveTable from '~/components/table/save-horoscope.vue'

// composable
const screen = useAwesomeScreen()

// compiler macro
useHead({
  title: 'Lá số tử vi',
  meta: [
    {
      name: 'description',
      content:
        'Tạo lá số tử vi - Luận giải lá số trực tuyến - Tạo lá số tử vi, Lá số tử vi trực tuyến, Tử vi online, AI tử vi, ai tử vi, luận giải, luận giải lá số, luận giải trực tuyến, lá số trực tuyến, dự đoán, dự đoán cuộc đời, dự đoán vận mệnh, dự đoán tình duyên, dự đoán sự nghiệp, dự đoán sức khỏe, dự đoán tài lộc, phân tích, phân tích lá số, phân tích tử vi, lá số cá nhân, lá số riêng, lá số chuẩn, lá số chính xác, luận giải chi tiết, tử vi trọn đời',
    },
    {
      name: 'keywords',
      content:
        'Tạo lá số tử vi, Lá số tử vi trực tuyến, Tử vi online, AI tử vi, ai tử vi, luận giải, luận giải lá số, luận giải trực tuyến, lá số trực tuyến, dự đoán, dự đoán cuộc đời, dự đoán vận mệnh, dự đoán tình duyên, dự đoán sự nghiệp, dự đoán sức khỏe, dự đoán tài lộc, phân tích, phân tích lá số, phân tích tử vi, lá số cá nhân, lá số riêng, lá số chuẩn, lá số chính xác, luận giải chi tiết, tử vi trọn đời',
    },
  ],
})

useHead({
  title: 'Lập lá số tử vi online',
  meta: [
    {
      name: 'description',
      content:
        'Lập lá số tử vi online theo ngày giờ sinh, xem cung mệnh, đại vận, tiểu vận và luận giải tử vi trọn đời bằng AI.',
    },
    {
      name: 'keywords',
      content:
        'lập lá số tử vi, lá số tử vi online, xem tử vi online, luận giải lá số tử vi, tử vi trọn đời, vận hạn tử vi',
    },
    {
      property: 'og:title',
      content: 'Lập lá số tử vi online | Tử Vi Thiên Mã',
    },
    {
      property: 'og:description',
      content:
        'Tạo lá số tử vi theo ngày giờ sinh và nhận luận giải chi tiết về vận hạn, tình duyên, sự nghiệp, tài lộc, sức khỏe.',
    },
  ],
})

// state
const enableSpamProtection = ref(false)
const enableDirList = ref(false)
const enableAdvancedSetting = ref(false)
</script>

<template>
  <LayoutPageWrapper>
    <LayoutPageHeader class="mt-6">
      <LayoutPageTitle text="Lá số tử vi" class="capitalize" />
    </LayoutPageHeader>
    <LayoutPageSection>
      <div class="mb-6">
        <HeadlessTabGroup
          as="div"
          class="flex flex-col md:flex-row md:space-x-4"
          :vertical="screen.higherThan('md')"
        >
          <HeadlessTabList
            class="w-full md:w-1/6 flex md:flex-col rounded-lg mb-2"
          >
            <HeadlessTab
              v-for="(item, i) in ['Tạo mới lá số', 'Lá số đã lưu']"
              :key="i"
              v-slot="{ selected }"
              as="template"
            >
              <button
                :class="[
                  'md:w-full text-left px-3 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                  selected
                    ? 'font-extrabold'
                    : 'text-gray-800 dark:text-gray-400',
                ]"
              >
                {{ item }}
              </button>
            </HeadlessTab>
          </HeadlessTabList>
          <HeadlessTabPanels class="flex-1">
            <!-- Lá số tử vi -->
            <HeadlessTabPanel>
              <HoroscopeCreateForm class="mb-6 w-full" />
            </HeadlessTabPanel>
            <!-- Lá số đã lưu -->
            <HeadlessTabPanel>
              <HoroscopeSaveTable />
            </HeadlessTabPanel>
          </HeadlessTabPanels>
        </HeadlessTabGroup>
      </div>
    </LayoutPageSection>
  </LayoutPageWrapper>
</template>
