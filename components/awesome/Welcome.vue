<script lang="ts" setup>
const { awesome } = useAppConfig()

const { parseMenuRoute, parseMenuTitle } = useNavbarParser()

const props = defineProps({
  withAlert: {
    type: Boolean,
    default: true,
  },
})
const showAlert = ref(
  awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    ? !awesome?.layout?.welcome?.disableInfoReplaceIndexInWelcomePage
    : props.withAlert,
)

const titlesText = computed<string[]>(() =>
  (
    awesome?.layout?.welcome?.title ||
    awesome?.name ||
    'Nuxt&nbsp;3 Awesome Starter'
  )
    .replaceAll('&nbsp;', '[space]')
    .split(' ')
    .map((item) => item.replaceAll('[space]', ' ')),
)
const leadingsText = computed(() => [
  {
    text: `${titlesText.value[0]} ${titlesText.value[1]}`,
    startColor: '#007CF0',
    endColor: '#00DFD8',
    delay: 0,
  },
  {
    text: `${titlesText.value[2]} ${titlesText.value[3]}`,
    startColor: '#7928CA',
    endColor: '#FF0080',
    delay: 2,
  },
  // {
  //   text: titlesText.value[2],
  //   startColor: '#FF4D4D',
  //   endColor: '#F9CB28',
  //   delay: 4,
  // },
])
const isLogin = ref(true)
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth <= 748
  const user = localStorage.getItem('user')
  if (user) {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
  try {
    // console.log('aweawe', parseMenuTitle('aweawe'), this)
  } catch (error) {
    // console.log('aweawe error', error)
  }
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 800
  })
})
</script>

<template>
  <div class="flex flex-col w-full">
    <LayoutPageWrapper class="flex-1 flex">
      <LayoutPageSection class="flex-1 flex">
        <div class="flex-1 flex flex-col items-center justify-center h-[80vh]">
          <div class="flex justify-center mb-12 md:mb-24 mx-4 md:mx-24">
            <el-text
              class="text-blink text-center"
              :style="isMobile ? 'margin-top: 30%' : ''"
              type="danger"
              >Nhân dịp khai trương, chúng tôi xin giảm giá còn 50k một lần luận
              giải lá số tử vi.</el-text
            >
          </div>
          <h1 class="text-center mt-4">
            <span
              v-for="(item, i) in leadingsText"
              :key="i"
              :style="`--content: '${item.text}'; --start-color: ${
                item.startColor
              }; --end-color: ${item.endColor}; --animation-name: anim-fg-${
                i + 1
              }`"
              class="animated-text-bg drop-shadow-xl text-6xl sm:text-8xl md:text-8xl lg:text-8xl 2xl:text-8xl block font-black uppercase"
            >
              <span class="animated-text-fg">{{ item.text }}</span>
            </span>
          </h1>
          <div class="px-4 mt-6 text-center max-w-[500px] md:max-w-[600px]">
            {{
              awesome?.description ||
              'a starter template for Nuxt 3 with minimalist themes design, built in components, drawer & menus, and more.'
            }}
          </div>
          <div
            v-if="showAlert"
            class="mt-4 w-auto text-center text-white bg-gray-800 rounded px-4 py-1 text-sm"
          >
            create file "~/pages/index.vue" to replace this page
          </div>
          <div
            v-if="!isLogin"
            :id="isMobile ? 'mobile-welcome-buttons' : ''"
            class="flex space-x-4 ml-2 mt-12 justify-center md:justify-start"
            :class="isMobile ? 'flex-col' : ''"
          >
            <AwesomeButton
              size="lg"
              :text="parseMenuTitle('Lá số mới')"
              :to="parseMenuRoute('/lasotuvi')"
              class="font-extrabold"
              :class="isMobile ? 'w-full' : ''"
            />
            <AwesomeButton
              :id="isMobile ? 'mobile-welcome-buttons' : ''"
              size="lg"
              :text="
                parseMenuTitle(
                  awesome?.layout?.welcome?.primaryActionButton?.title ||
                    'Nuxt 3',
                )
              "
              :to="
                parseMenuRoute(
                  awesome?.layout?.welcome?.primaryActionButton?.to ||
                    'https://nuxt.com',
                )
              "
              class="font-extrabold"
              :class="isMobile ? 'mt-2 w-full' : ''"
            />
            <AwesomeButton
              v-if="
                parseMenuRoute(
                  awesome?.layout?.welcome?.secondaryActionButton?.to ||
                    awesome?.project?.links?.github,
                )
              "
              :id="isMobile ? 'mobile-welcome-buttons' : ''"
              :text="
                parseMenuTitle(
                  awesome?.layout?.welcome?.secondaryActionButton?.title ||
                    'Github',
                )
              "
              :to="
                parseMenuRoute(
                  awesome?.layout?.welcome?.secondaryActionButton?.to ||
                    awesome?.project?.links?.github,
                )
              "
              size="lg"
              class="font-extrabold"
              :class="isMobile ? 'mt-2 w-full ml-0' : ''"
              type="secondary"
            />
          </div>
          <div
            v-else
            class="flex space-x-4 ml-2 mt-12 justify-center md:justify-start"
          >
            <AwesomeButton
              size="lg"
              :text="parseMenuTitle('Lá số mới')"
              :to="parseMenuRoute('/lasotuvi')"
              class="font-extrabold"
            />
            <AwesomeButton
              :text="parseMenuTitle('Lá số mẫu')"
              :to="parseMenuRoute('/horoscope/solve/1')"
              size="lg"
              class="font-extrabold"
              type="secondary"
            />
          </div>
        </div>
      </LayoutPageSection>
    </LayoutPageWrapper>
    <LayoutPageWrapper class="mb-24">
      <div class="mt-12">
        <div class="flex justify-center">
          <h2
            class="text-3xl font-bold mb-4 text-amber-600 text-center"
            :style="isMobile ? 'margin-top: 60px' : ''"
          >
            Khám phá vận mệnh, tìm hiểu bản thân và cuộc sống
          </h2>
        </div>
        <div class="mt-12 flex flex-wrap">
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col justify-center pl-6 pr-44 order-2'
            "
            class=""
          >
            <h3 class="text-xl font-bold mb-4">Chúng tôi là ai</h3>
            <h4 class="text-md mb-2">
              Tử vi thiên mã là nền tảng lập lá số và luận giải lá số online
              trực tuyến. Kết hợp giữa kiến thức cố truyền và công nghệ số trí
              tuệ nhân tạo AI, chúng tôi mang đến cho bạn những trải nghiệm
              tuyệt vời trong việc khám phá bản thân qua lá số tử vi. Bạn cảm
              thấy bất cập khi phải liên hệ với thầy cô để lập lá số và luận
              giải? Hãy để Tử vi thiên mã giúp bạn giải quyết vấn đề này một
              cách nhanh chóng và tiện lợi nhất. Chỉ với vài thao tác đơn giản,
              bạn có thể lập lá số và nhận được luận giải chi tiết và trọn đời
              ngay trên trang web của chúng tôi. Với nhiều năm kinh nghiệm trong
              việc nghiên cứu và phân tích lá số tử vi, chúng tôi cam kết mang
              đến cho bạn những luận giải chính xác và sâu sắc nhất về tài lộc,
              sự nghiệp, tình duyên, sức khỏe,... giúp bạn hiểu rõ hơn về bản
              thân và định hướng cuộc sống.
            </h4>
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col items-end order-1'
            "
          >
            <img
              :class="isMobile ? 'w-full' : 'w-3/4'"
              src="assets/images/tuvi/ai_tuvi_ngu hanh.jpg"
              alt="About Us"
            />
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col justify-center pl-44 pr-6 order-3'
            "
            class=""
          >
            <h3 class="text-xl font-bold mb-4">Công nghệ cốt lõi</h3>
            <h4 class="text-md mb-2">
              Tử vi thiên mã ứng dụng công nghệ AI trí tuệ nhân tạo phân tích dữ
              liệu lớn để nâng độ chính xác và sâu sắc của luận giải lá số tử
              vi. Hệ thống sử dụng công nghệ hiện đại kết hợp với tri thức tử vi
              cổ truyền tam hợp phái và thiên lương phái, phân tích và chỉ ra
              các mối quan hệ phức tạp giữa các yếu tố sao trong lá số để đưa ra
              những dự đoán chính xác về vận mệnh của bạn. Bên cạnh đó, chúng
              tôi còn sử dụng các thuật toán tiên tiến để tối ưu hóa trải nghiệm
              người dùng, giúp bạn dễ dàng lập lá số và nhận luận giải một cách
              nhanh chóng và tiện lợi nhất.
            </h4>
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col items-start order-4'
            "
          >
            <img
              :class="isMobile ? 'w-full' : 'w-3/4'"
              src="assets/images/tuvi/ban_tay_ngu hanh.jpg"
              alt="About Us"
            />
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col justify-center pl-6 pr-44 order-6'
            "
            class=""
          >
            <h3 class="text-xl font-bold mb-4">
              Tại sao bạn lại cần tử vi thiên mã?
            </h3>
            <h4 class="text-md mb-2">
              - Đã bao giờ bạn cảm thấy người khác thành công còn mình vẫn dậm
              chân tại chỗ?<br />- Bạn từng lựa chọn sai lầm trong cuộc sống dẫn
              tới những hậu quả không mong muốn?<br />- Bạn cảm thấy bối rối và
              mất phương hướng trong tương lai?<br />
              - Bạn gặp hạn bất ngờ trong cuộc sống và gây ra những nỗi đau khó
              có thể cứu vãn?<br />
              Tử vi thiên mã sẽ đồng hành cùng bạn giúp bạn giải đáp những thắc
              mắc này. Giúp bạn tự tin hơn trong những lựa chọn trong cuộc sống,
              nhận diện những cơ hội và tránh những rủi ro tiềm ẩn. Hãy để tử vi
              thiên mã giúp bạn khám phá vận mệnh và tìm thấy con đường đúng đắn
              cho cuộc sống của mình.
            </h4>
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col items-end order-5'
            "
          >
            <img
              :class="isMobile ? 'w-full' : 'w-3/4'"
              src="assets/images/tuvi/la_kinh.jpg"
              alt="About Us"
            />
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col justify-center pl-44 pr-6 order-7'
            "
            class=""
          >
            <h3 class="text-xl font-bold mb-4">
              Dịch vụ chuyên sâu của tử vi thiên mã
            </h3>
            <h4 class="text-md mb-2">
              Tử vi thiên mã cung cấp dịch vụ lập lá số và luận giải lá số tử vi
              chuyên sâu.<br />- Trong đó bao gồm luận giải chi tiết về cuộc đời
              qua 12 cung tử vi (Mệnh, phụ mẫu, phúc đức, điền trạch, quan lộc,
              nô bộc, thiên di, tật ách, tài bạch, tử tức, phu thê, huynh đệ)
              giúp bạn hiểu rõ từng khía cạnh trong cuộc sống, biết được ưu
              nhược điểm của chính mình để phát huy và khắc phục.<br />- Phân
              tích từng đại vận 10 năm trong cuộc sống. Biết được thời điểm nào
              thịnh vào việc gì, suy vào việc gì. Giúp bạn nắm bắt cơ hội và
              vượt qua thử thách trong từng giai đoạn.<br />Bên cạnh đó chúng
              tôi cũng chỉ ra những vận hạn mà bạn có thể gặp phải trong cuộc
              sống để có thể ứng phó kịp thời.
            </h4>
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col items-start order-8'
            "
          >
            <img
              :class="isMobile ? 'w-full' : 'w-3/4'"
              src="assets/images/tuvi/xoan_oc.jpg"
              alt="About Us"
            />
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col justify-center pl-6 pr-44 order-10'
            "
            class=""
          >
            <h3 class="text-xl font-bold mb-4">Ưu điểm của tử vi thiên mã</h3>
            <h4 class="text-md mb-2">
              Dịch vụ của chúng tôi mang lại nhiều ưu điểm vượt trội so với các
              phương pháp truyền thống.<br />- Thứ nhất, dịch vụ sử dụng công
              nghệ AI hiện đại kết hợp phương pháp luận giải cổ truyền cho độ
              chính xác cao, lời lẽ dễ hiểu mang tính hàn lâm không mê tín dị
              đoan.<br />- Thứ hai, bạn có thể lập lá số và luận giải mọi lúc
              mọi nơi chỉ cần có kết nối internet, không cần phải đến gặp thầy
              cô trực tiếp.<br />- Thứ ba, quy trình lập lá số và nhận luận giải
              rất đơn giản và nhanh chóng, chỉ với vài thao tác cơ bản.<br />-
              Thứ tư, chi phí dịch vụ rất hợp lý và tiết kiệm so với việc phải
              trả tiền công thầy cô truyền thống.<br />- Cuối cùng, chúng tôi
              cam kết mang đến cho bạn trải nghiệm luận giải lá số tử vi tốt
              nhất và sát với thực tế nhất.
            </h4>
          </div>
          <div
            :class="
              isMobile
                ? 'w-full mt-8'
                : 'w-6/12 flex flex-col items-end order-9'
            "
          >
            <img
              :class="isMobile ? 'w-full' : 'w-3/4'"
              src="assets/images/tuvi/am_duong_ai.jpg"
              alt="About Us"
            />
          </div>
        </div>
        <div class="mt-24 flex flex-col items-center">
          <h3 class="text-2xl font-bold">Liên hệ với chúng tôi</h3>
          <a
            class="mt-6 flex items-center"
            href="https://www.facebook.com/profile.php?id=61583520309932"
            target="_blank"
          >
            <img
              src="assets/images/fb.png"
              height="24"
              width="24"
              class="icon-secondary"
            />
            <span class="ml-4">Fanpage Tử Vi Thiên Mã</span>
          </a>
        </div>
      </div>
    </LayoutPageWrapper>
  </div>
</template>

<style lang="scss">
:root {
  --padding: 0.05em;
}

@keyframes anim-fg-1 {
  0%,
  16.667%,
  100% {
    opacity: 1;
  }
  33.333%,
  83.333% {
    opacity: 0;
  }
}
@keyframes anim-fg-2 {
  0%,
  16.667%,
  66.667%,
  100% {
    opacity: 0;
  }
  33.333%,
  50% {
    opacity: 1;
  }
}
@keyframes anim-fg-3 {
  0%,
  50%,
  100% {
    opacity: 0;
  }
  66.667%,
  83.333% {
    opacity: 1;
  }
}
.animated-text-bg {
  position: relative;
  display: block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  content: var(--content);
  display: block;
  width: 100%;
  color: theme('colors.slate.800');
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 0;
  padding-left: var(--padding);
  padding-right: var(--padding);
  &:before {
    content: var(--content);
    position: absolute;
    display: block;
    width: 100%;
    color: theme('colors.slate.800');
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    padding-left: var(--padding);
    padding-right: var(--padding);
  }
}
.animated-text-fg {
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-left: var(--padding);
  padding-right: var(--padding);
  background-image: linear-gradient(
    90deg,
    var(--start-color),
    var(--end-color)
  );
  position: relative;
  opacity: 0;
  z-index: 1;
  animation: var(--animation-name) 8s infinite;
}
html.dark {
  .animated-text-bg {
    color: theme('colors.gray.100');
    &:before {
      color: theme('colors.gray.100');
    }
  }
}

.el-text.el-text--danger {
  font-weight: 800;
  font-size: 24px;
}
@keyframes blink {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0.7;
  }
}

.text-blink {
  animation: blink 1.5s infinite;
}

#mobile-welcome-buttons {
  margin-left: 0px;
}
</style>
