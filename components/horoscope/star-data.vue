<template>
  <!-- ô dần -->
  <div
    class="py-2 md:py-3 px-1 h-full flex flex-col justify-between items-center font-sans font-bold tracking-tight"
  >
    <div class="w-full">
      <!-- G.Dần - Thiên di - 63 -->
      <div class="mt-[-10px] md:mt-0 flex justify-evenly items-center w-full">
        <p class="text-[8px] md:text-xs text-center w-1/6">
          <span>{{ starData.decadal.heavenlyStem[0] }}</span>
          <span>.</span>
          <span>{{ starData.decadal.earthlyBranch }}</span>
        </p>
        <div class="w-4/6 flex flex-row justify-center items-center">
          <p
            class="text-[8px] md:text-sm font-extrabold text-[#2e1964] inline-block whitespace-nowrap"
          >
            {{ starData.name }}
          </p>
          <div
            v-if="starData.isBodyPalace"
            class="body-palace-badge h-[9px] md:h-[18px] mx-[0.5px] md:mx-[2px] md:px-[1px] bg-red-950 rounded flex items-center"
          >
            <span
              class="body-palace-span text-center text-[5px] px-[1.5px] md:text-xs text-zinc-100 md:pl-[6px] md:pr-[6px] pt-1 md:pt-0"
              :class="[isMessenger ? 'mess-body-font' : '']"
              >THÂN</span
            >
          </div>
        </div>

        <p class="text-[7px] md:text-sm w-1/6 text-center">
          {{ starData.decadal.range[0] }}
        </p>
      </div>
      <div class="w-full relative">
        <!-- list sao chính -->
        <div
          class="mt-[-6px] md:mt-1 flex flex-col justify-center items-center w-full h-8 md:h-22"
        >
          <span
            v-for="(star, index) in starData.majorStars"
            :key="index"
            class="flex items-center h-4 md:h-8 text-[9px] md:text-sm"
            :style="{ color: calculateMajorStarColor(star.name) }"
            >{{ `${star.name} (${star.brightness[0]})` }}</span
          >
        </div>
        <div v-if="!isMobile">
          <!-- phi tinh hóa lộc -->
          <div
            v-if="fourStarsGood"
            class="absolute top-[30px] left-[15px] w-6 h-6 rounded-full border-2 bg-transparent flex items-center justify-center text-base text-center leading-none font-bold"
            style="border-color: #166534; color: #166534"
          >
            A
          </div>
          <!-- phi tinh hóa kỵ -->
          <div
            v-if="fourStarsBad"
            class="absolute top-[30px] right-[15px] w-6 h-6 rounded-full border-2 bg-transparent flex items-center justify-center text-base text-center leading-none font-bold"
            style="border-color: #7c2d12; color: #7c2d12"
          >
            D
          </div>
        </div>
        <div v-else>
          <!-- phi tinh hóa lộc -->
          <div
            v-if="fourStarsGood"
            class="absolute top-[10px] left-[-4px] w-3 h-3 rounded-full border-[1px] bg-transparent flex items-center justify-center text-[9px] text-center leading-none font-bold"
            style="border-color: #166534; color: #166534"
          >
            A
          </div>
          <!-- phi tinh hóa kỵ -->
          <div
            v-if="fourStarsBad"
            class="absolute top-[10px] right-[-4px] w-3 h-3 rounded-full border-[1px] bg-transparent flex items-center justify-center text-[9px] text-center leading-none font-bold"
            style="border-color: #7c2d12; color: #7c2d12"
          >
            D
          </div>
        </div>

        <!-- list sao -->
        <div
          class="flex flex-row justify-around items-center w-full h-20 md:h-30 md:mt-4"
        >
          <div class="flex flex-col justify-center items-center w-1/2">
            <span
              v-for="(star, index) in calculateGoodSubStars(starData)"
              :key="index"
              class="bg-palace-list flex items-center h-[10px] my-[0.5px] md:h-4 text-[6px] md:text-xs px-2 py-1"
              :class="[isMessenger ? 'mess-star-font' : '']"
              :style="{
                color: star.color,
                backgroundColor: star.bgColor || 'transparent',
              }"
              style="width: max-content"
              >{{ star.name }}</span
            >
          </div>
          <div class="flex flex-col justify-center items-center w-1/2">
            <span
              v-for="(star, index) in calculateBadSubStars(starData)"
              :key="index"
              class="bg-palace-list flex items-center h-[10px] my-[0.5px] md:h-4 text-[6px] md:text-xs px-2 py-1"
              :class="[isMessenger ? 'mess-star-font' : '']"
              :style="{
                color: star.color,
                backgroundColor: star.bgColor || 'transparent',
              }"
              style="width: max-content"
              >{{ star.name }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- list tuổi -->
    <!-- lâm quan -->
    <div
      class="mt-[1.5px] md:mt-6 flex flex-col justify-center items-center w-full h-10 md:h-16"
      :class="[isMessenger ? 'mess-bottom-font' : '']"
    >
      <p
        class="text-[6px] md:text-[11px] leading-tight"
        :class="[isMessenger ? 'mess-star-font' : '']"
        style="width: max-content"
      >
        <!-- {{ starData.ages.slice(0, starData.ages.length - 2).join(', ') }} -->
        {{ starData.bornAges.join(', ') }}
      </p>

      <div
        class="mt-[-8px] md:mt-0 md:h-5 w-full flex justify-around text-center"
        :class="[isMessenger ? 'mess-lunar-palace' : '']"
      >
        <div class="w-3/12 flex justify-center">
          <p
            class="text-[6px] md:text-xs inline-block whitespace-nowrap"
            :class="[isMessenger ? 'mess-star-font' : '']"
          >
            {{ `năm ${starData.minorPalace}` }}
          </p>
        </div>
        <div class="w-6/12 flex justify-center">
          <p
            class="text-[6px] md:text-xs inline-block whitespace-nowrap"
            :class="[isMessenger ? 'mess-star-font' : '']"
          >
            {{ starData.changsheng12 }}
          </p>
        </div>
        <div class="w-3/12 flex justify-center">
          <p
            class="text-[6px] md:text-xs inline-block whitespace-nowrap"
            :class="[isMessenger ? 'mess-star-font' : '']"
          >
            {{ `tháng ${starData.moonPalace}` }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { all } from 'axios'
import { ref } from 'vue'
// import { blockPalace } from '~/server/utils/horoscope'

// Cần thêm phần tiểu vận - ok r này
// Thêm nguyệt vận - ok r này
// Sửa lại vị trí tuần triệt
// Sửa lại dãy tuổi của người xem - ok r này

const isMessenger = ref(false)
const isMobile = ref(false)

onMounted(() => {
  const ua = navigator.userAgent || ''
  const checkMess = /Messenger|FBAN|FB_IAB|FBAV|FBIOS|FB_IOS/i.test(ua)
  const isMobileWidth = window.innerWidth < 768
  if (checkMess && isMobileWidth) {
    isMessenger.value = true
  }
  isMobile.value = window.innerWidth < 1080
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 1080
  })
})

interface Props {
  starData: {
    name: string
    ages: string[]
    bornAges: string[]
    changsheng12: string
    decadal: {
      heavenlyStem: string[]
      earthlyBranch: string
      range: number[]
    }
    majorStars: { name: string; brightness: string[] }[]
    minorStars?: { name: string; brightness: string[] }[]
    blockPalace?: { name: string }[]
    yearStars?: { name: string }[]
    suiqian12?: string
    boshi12?: string
    jiangqian12?: string
    adjectiveStars?: { name: string }[]
    isBodyPalace?: string | boolean
    minorPalace?: string
    moonPalace?: string
  }
  fourStarsGood?: boolean
  fourStarsBad?: boolean
}

const props = defineProps<Props>()
const starData = ref({
  name: props.starData.name,
  ages: props.starData.ages,
  bornAges: props.starData.bornAges,
  changsheng12: props.starData.changsheng12,
  decadal: props.starData.decadal,
  majorStars: props.starData.majorStars,
  minorStars: props.starData.minorStars || [],
  minorPalace: props.starData.minorPalace || '',
  moonPalace: props.starData.moonPalace || '',
  suiqian12: props.starData.suiqian12 || '',
  boshi12: props.starData.boshi12 || '',
  jiangqian12: props.starData.jiangqian12 || '',
  adjectiveStars: props.starData.adjectiveStars || [],
  isBodyPalace: props.starData.isBodyPalace || false,
  blockPalace: props.starData.blockPalace || [],
  yearStars: props.starData.yearStars || [],
})

const listColors = {
  hydro: '#100301',
  pyro: '#B71C1C',
  dendro: '#1B5E20',
  geo: '#FF6F00',
  metal: '#616161',
  block: '#ecf0f1',
}
const listMajorStars = ref([
  { name: 'Thất Sát', color: listColors.metal },
  { name: 'Vũ Khúc', color: listColors.metal },

  { name: 'Thái Âm', color: listColors.hydro },
  { name: 'Phá Quân', color: listColors.hydro },
  { name: 'Cự Môn', color: listColors.hydro },
  { name: 'Thiên Đồng', color: listColors.hydro },
  { name: 'Thiên Tướng', color: listColors.hydro },

  { name: 'Thiên Cơ', color: listColors.dendro },
  { name: 'Tham Lang', color: listColors.dendro },

  { name: 'Tử Vi', color: listColors.geo },
  { name: 'Thiên Phủ', color: listColors.geo },
  { name: 'Thiên Lương', color: listColors.geo },

  { name: 'Thái Dương', color: listColors.pyro },
  { name: 'Liêm Trinh', color: listColors.pyro },
])
const listBgColors = {
  trans: '#D1C4E9', // Tứ hóa
  block: '#424949', // Tuần triệt
}
const listGoodSubStars = ref([
  { name: 'Hóa Lộc', color: listColors.geo, bgColor: listBgColors.trans },
  { name: 'Hóa Quyền', color: listColors.dendro, bgColor: listBgColors.trans },
  { name: 'Hóa Khoa', color: listColors.hydro, bgColor: listBgColors.trans },
  { name: 'Hóa Kỵ', color: listColors.hydro, bgColor: listBgColors.trans },

  { name: 'Văn Khúc', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Văn Xương', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Tả Phù', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Hữu Bật', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Đường Phù', color: listColors.dendro, bgColor: 'transparent' },

  { name: 'Thiên Mã', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Khôi', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Việt', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Giải', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Đức', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Quý', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Tài', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Thọ', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Phúc', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Hỷ', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Sứ', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Y', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Trù', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Quan', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Ân Quang', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Tuế Dịch', color: listColors.pyro, bgColor: 'transparent' },

  { name: 'Hỷ Thần', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Lực Sỹ', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Bát Tọa', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Bác Sỹ', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Tam Thai', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thai Phụ', color: listColors.metal, bgColor: 'transparent' },

  { name: 'Phan Án', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Tướng Tinh', color: listColors.metal, bgColor: 'transparent' },

  { name: 'Địa Giải', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Phong Cáo', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Giải Thần', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Niên Giải', color: listColors.hydro, bgColor: 'transparent' },

  { name: 'Quốc Ấn', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Tướng Quân', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Hồng Loan', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Đào Hoa', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Hoa Cái', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Thanh Long', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Long Trì', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Phụng Các', color: listColors.dendro, bgColor: 'transparent' },

  { name: 'Nguyệt Đức', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Tấu Thư', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Lộc Tồn', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Vu', color: listColors.hydro, bgColor: 'transparent' },

  // Vòng sao lưu niên tốt
  { name: 'L.Lộc Tồn', color: listColors.geo, bgColor: 'transparent' },
  { name: 'L.Thiên Mã', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'LN.Văn Tinh', color: listColors.metal, bgColor: 'transparent' },

  // Vòng sao lưu niên tứ hóa
  { name: 'L.Hóa Lộc', color: listColors.geo, bgColor: 'transparent' },
  { name: 'L.Hóa Khoa', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'L.Hóa Quyền', color: listColors.dendro, bgColor: 'transparent' },
])

const listBadSubStars = ref([
  // { name: 'Hóa Kỵ', color: listColors.hydro, bgColor: listBgColors.trans },
  { name: 'Thiên Hình', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên La', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Địa Võng', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Địa Không', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Địa Kiếp', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Kiếp Sát', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Khốc', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Hư', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Phạt', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Kình Dương', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Đà La', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Linh Tinh', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Hỏa Tinh', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Cô Thần', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Quả Tú', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Phục Binh', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Phá Toái', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Quan Phủ', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Bệnh Phù', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Thiên Diêu', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Thương', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Thiên Nguyệt', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiên Sát', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Nguyệt Sát', color: listColors.hydro, bgColor: 'transparent' },

  { name: 'Không Vong', color: listColors.metal, bgColor: 'transparent' },
  { name: 'Chỉ Bối', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Tức Thần', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Quán Tác', color: listColors.geo, bgColor: 'transparent' },
  { name: 'Vong Thần', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Tai Sát', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Âm Sát', color: listColors.pyro, bgColor: 'transparent' },

  { name: 'Tuần', color: listColors.block, bgColor: listBgColors.block },
  { name: 'Triệt', color: listColors.block, bgColor: listBgColors.block },
  // { name: 'Tuần Không', color: listColors.block, bgColor: listBgColors.block },
  // { name: 'Triệt Lộ', color: listColors.block, bgColor: listBgColors.block },

  { name: 'Thái Tuế', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Quan Phù', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Bạch Hổ', color: listColors.metal, bgColor: 'transparent' },

  { name: 'Tang Môn', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'Tuế Phá', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Điếu Khách', color: listColors.pyro, bgColor: 'transparent' },

  { name: 'Thiên Không', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Tử Phù', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Phúc Đức', color: listColors.geo, bgColor: 'transparent' },

  { name: 'Long Đức', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Thiếu Âm', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'Trực Phù', color: listColors.pyro, bgColor: 'transparent' },

  { name: 'Phi Liêm', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Đại Hao', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Tiểu Hao', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'Lưu Hà', color: listColors.hydro, bgColor: 'transparent' },

  // Vòng sao lưu niên an luôn tại đây
  { name: 'L.Thái Tuế', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Thiếu Dương', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Tang Môn', color: listColors.dendro, bgColor: 'transparent' },
  { name: 'L.Thiếu Âm', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'L.Quan Phù', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Tử Phù', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Tuế Phá', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Long Đức', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'L.Bạch Hổ', color: listColors.metal, bgColor: 'transparent' },
  { name: 'L.Phúc Đức', color: listColors.geo, bgColor: 'transparent' },
  { name: 'L.Điếu Khách', color: listColors.pyro, bgColor: 'transparent' },
  { name: 'L.Trực Phù', color: listColors.pyro, bgColor: 'transparent' },

  { name: 'L.Thiên Hư', color: listColors.hydro, bgColor: 'transparent' },
  { name: 'L.Thiên Khốc', color: listColors.hydro, bgColor: 'transparent' },

  { name: 'L.Kình Dương', color: listColors.metal, bgColor: 'transparent' },
  { name: 'L.Đà La', color: listColors.metal, bgColor: 'transparent' },

  { name: 'L.Hóa Kỵ', color: listColors.hydro, bgColor: 'transparent' },
])

const listChangeNameStars = ref([
  { name: 'Đài Phụ', newName: 'Thai Phụ' },
  { name: 'Hàm Trì', newName: 'Đào Hoa' },
])

interface Palace {
  adjectiveStars: { name: string }[]
  [key: string]: any
}

const getAllStar = (palace: Palace) => {
  const allStars = [
    { name: palace?.suiqian12 },
    { name: palace?.boshi12 },
    { name: palace?.jiangqian12 },
    ...(palace?.adjectiveStars || []),
    ...(palace?.minorStars || []),
    ...(palace?.blockPalace || []),
    ...(palace?.yearStars || []),
  ]

  palace?.majorStars.forEach((star: any) => {
    if (star.mutagen.length > 0) {
      allStars.unshift({ name: `Hóa ${star.mutagen}` })
    }
  })
  palace?.minorStars.forEach((star: any) => {
    if (star.mutagen) {
      allStars.unshift({ name: `Hóa ${star.mutagen}` })
    }
  })
  allStars.forEach((star: any) => {
    const changeNameStar = listChangeNameStars.value.find(
      (item) => item.name === star.name,
    )
    if (changeNameStar) {
      star.name = changeNameStar.newName
    }
  })
  // Remove duplicates
  const uniqueStars = new Set(allStars.map((star) => star.name))
  const uniqueStarsArray = Array.from(uniqueStars).map((name) => ({
    name,
  }))
  return uniqueStarsArray
}

type Star = {
  name: string
  color?: string
  bgColor?: string
}

const calculateGoodSubStars = (palace: Palace) => {
  const goodStars: Star[] = []
  const allStars = getAllStar(palace)
  allStars.forEach((star: any) => {
    if (
      listGoodSubStars.value.some((goodStar) => goodStar.name === star.name)
    ) {
      goodStars.push({
        name: star.name,
        color:
          listGoodSubStars.value.find((goodStar) => goodStar.name === star.name)
            ?.color || '#000',
        bgColor:
          listGoodSubStars.value.find((goodStar) => goodStar.name === star.name)
            ?.bgColor || 'transparent',
      })
    } else if (
      !listBadSubStars.value.some((badStar) => badStar.name === star.name)
    ) {
      console.log(`Unknown star: ${star.name}.`)
    }
  })
  return goodStars
}

const calculateBadSubStars = (palace: Palace) => {
  const badStars: Star[] = []
  const allStars = getAllStar(palace)

  allStars.forEach((star: any) => {
    if (listBadSubStars.value.some((badStar) => badStar.name === star.name)) {
      badStars.push({
        name: star.name,
        color:
          listBadSubStars.value.find((badStar) => badStar.name === star.name)
            ?.color || '#000',
        bgColor:
          listBadSubStars.value.find((badStar) => badStar.name === star.name)
            ?.bgColor || 'transparent',
      })
    } else if (
      !listGoodSubStars.value.some((goodStar) => goodStar.name === star.name)
    ) {
      console.log(`Unknown star: ${star.name}.`)
    }
  })
  return badStars
}

const calculateMajorStarColor = (starName: string) => {
  const star = listMajorStars.value.find((s) => s.name === starName)
  return star ? star.color : '#000'
}
</script>

<style scoped>
.mess-star-font {
  font-size: 12px !important;
  transform: scale(0.5) !important;
}
.mess-body-font {
  font-size: 10px !important;
  transform: scale(0.5) !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.mess-lunar-palace {
  margin-top: -12px !important;
}
.mess-bottom-font {
  margin-top: -5px !important;
}
</style>
