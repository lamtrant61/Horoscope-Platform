import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { vi } from 'vitest'

Object.assign(globalThis, {
  computed,
  reactive,
  ref,
  defineStore,
  useRouter: () => ({
    push: vi.fn(),
  }),
  useNuxtApp: () => ({
    $api: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    },
  }),
})
