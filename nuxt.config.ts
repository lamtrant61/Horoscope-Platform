import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  // exp
  experimental: {
    localLayerAliases: true,
  },

  // app config
  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ],
    },
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // typescripts
  // todo: feat/strict-type-check
  // typescript: {
  //   strict: true,
  //   typeCheck: true,
  // },

  // modules
  modules: [
    // chore
    '@nuxtjs/eslint-module',
    // styling & ui
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    // management
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // contents,
    '@nuxt/content',
    [
      '@nuxtjs/sitemap',
      {
        siteUrl: 'https://tuvithienma.com',
        gzip: true,
        urls: [
          {
            loc: '/',
            changefreq: 'weekly',
            priority: 1,
          },
          {
            loc: '/lasotuvi',
            changefreq: 'weekly',
            priority: 0.9,
          },
          {
            loc: '/horoscope/solve/1',
            changefreq: 'monthly',
            priority: 0.7,
          },
        ],
        exclude: [
          '/manage/**',
          '/payment/**',
          '/post/**',
          '/horoscope/login/**',
          '/logout/**',
        ],
        autoLastmod: true,
      },
    ],
    [
      '@nuxtjs/robots',
      {
        rules: [
          {
            UserAgent: '*',
            Allow: '/',
            Disallow: [
              '/manage',
              '/payment',
              '/post',
              '/horoscope/login',
              '/logout',
            ],
          },
        ],
        sitemap: 'https://tuvithienma.com/sitemap.xml',
      },
    ],

    // todo: feat/localization
    // '@nuxtjs/i18n'
  ],

  css: [
    resolve('./assets/scss/_variables.scss'),
    resolve('./assets/scss/app.scss'),
    resolve('./assets/css/fonts.css'),
    resolve('./assets/css/custom.css'),
  ],

  components: [
    {
      prefix: 'Layout',
      path: resolve('./components/layouts'),
      global: true,
    },
    {
      prefix: 'Awesome',
      path: resolve('./components/awesome'),
      global: true,
    },
  ],

  imports: {
    dirs: [resolve('./stores'), '~/stores'],
  },

  // module::pinia
  pinia: {
    storesDirs: ['~/stores/**', '#/stores/**', '@/stores/**'],
  },

  // module::headlessui
  headlessui: {
    prefix: 'Headless',
  },

  // module::color-mode
  colorMode: {
    preference: 'light', // 👈 ép mặc định thành "light"
    fallback: 'light', // nếu không có localStorage
    classSuffix: '', // tránh tạo class kiểu `dark-mode`
  },

  // module::content
  content: {
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },

  // todo: feat/localization
  // module::i18n
  // i18n: {
  //   strategy: 'no_prefix',
  //   defaultLocale: 'en',
  //   langDir: 'locales',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //   },
  //   detectBrowserLanguage: {
  //     useCookie: true,
  //     fallbackLocale: 'en',
  //     redirectOn: 'root',
  //   },
  //   locales: [
  //     {
  //       code: 'en', // English
  //       iso: 'en-US',
  //       name: 'English',
  //       file: 'en.yml',
  //     },
  //     {
  //       code: 'id', // Indonesia
  //       iso: 'id-ID',
  //       name: 'Indonesia',
  //       file: 'id.yml',
  //     }
  //   ]
  // },
})
