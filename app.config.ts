import type { RouteLocationRaw } from 'vue-router'
import type { NuxtApp } from '#app'

export interface NuxtAwesomeAppConfig {
  /** title name */
  name?: string
  website?: string
  logo?: string
  /** description */
  description?: string
  keywords?: string

  /** project config */
  project?: {
    /** links */
    links?: {
      /** project github link */
      github?: string
    }
  }

  /** layout config */
  layout?: {
    /** page layout */
    page?: {
      /** navbar */
      navbar?: {
        /** menus in navbar */
        menus?: Array<{
          type?: 'link' | 'button' | 'dropdown'
          title?: string | ((nuxt: NuxtApp) => string)
          to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
          children?: Array<{
            type?: 'link'
            title?: string | ((nuxt: NuxtApp) => string)
            to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
          }>
        }>
      }
    }
    /** footer */
    footer?: {
      /** footer year */
      year?: number
    }
    /** welcome component page */
    welcome?: {
      title?: string
      disableInfoReplaceIndexInWelcomePage?: boolean
      primaryActionButton?: {
        title?: string
        to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
      }
      secondaryActionButton?: {
        title?: string
        to?: RouteLocationRaw | ((nuxt: NuxtApp) => RouteLocationRaw)
      }
    }
  }

  /** author config */
  author?: {
    /** author name */
    name?: string
    /** author links */
    links?: {
      /** author github link */
      github?: string
      /** author medium link */
      medium?: string
      /** author website link */
      website?: string
    }
  }

  /** author config */
  disableInfoReplaceIndexInWelcomePage?: boolean
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    awesome?: NuxtAwesomeAppConfig
  }
}

export default defineAppConfig({
  awesome: {
    name: 'Tử Vi Thiên Mã',
    website: 'https://tuvithienma.com',
    description:
      'Lập lá số tử vi online và luận giải tử vi trọn đời, vận hạn từng năm, tình duyên, sự nghiệp, tài lộc, sức khỏe bằng AI.',
    keywords:
      'tử vi, lá số tử vi, lập lá số tử vi, xem tử vi online, luận giải tử vi, tử vi trọn đời, tử vi năm, vận hạn, đại vận, tiểu vận, cung mệnh, cung phu thê, cung quan lộc, cung tài bạch, AI tử vi',
    disableInfoReplaceIndexInWelcomePage: true,
    logo: '/logo.png',
    project: {
      links: {
        github: 'https://github.com/lamtrant61/Horoscope-Nuxt3',
      },
    },
    layout: {
      page: {
        navbar: {
          menus: [
            {
              type: 'button',
              title: 'Tử vi',
              to: { name: 'lasotuvi', needLogin: false },
            },
            {
              type: 'button',
              title: 'Lá số mẫu',
              to: { url: '/horoscope/solve/1', needLogin: false },
            },
            {
              type: 'button',
              title: 'Nạp xu',
              to: { name: 'payment', needLogin: true },
            },
            {
              type: 'button',
              title: 'Đăng xuất',
              to: { name: 'logout', needLogin: true },
            },
          ],
        },
      },
      footer: {
        year: new Date().getFullYear(),
      },
      welcome: {
        title: 'Tử Vi Thiên Mã',
        disableInfoReplaceIndexInWelcomePage: true,
        primaryActionButton: {
          title: 'Đăng nhập',
          to: () => {
            return { name: 'horoscope-login', query: { tab: 'login' } }
          },
        },
        secondaryActionButton: {
          title: 'Đăng ký',
          to: () => {
            return { name: 'horoscope-login', query: { tab: 'register' } }
          },
        },
      },
    },
    author: {
      name: 'lamtrant61',
      links: {
        github: 'https://github.com/lamtrant61',
        website: 'https://github.com/lamtrant61',
      },
    },
  },
  nuxtIcon: {
    aliases: {
      logo: 'logo.png',
    },
    class: '',
    size: '1em',
  },
})
