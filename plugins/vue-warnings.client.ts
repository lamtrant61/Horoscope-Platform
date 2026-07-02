/* eslint-disable no-console */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.warnHandler = () => {}

  const originalWarn = console.warn
  console.warn = (...args: unknown[]) => {
    const firstArg = args[0]
    if (typeof firstArg === 'string' && firstArg.startsWith('[Vue warn]')) {
      return
    }

    originalWarn(...args)
  }
})
