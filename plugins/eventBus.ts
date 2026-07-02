// plugins/event-bus.ts
import mitt from 'mitt'

type Events = {
  'my-event': { message: string }
  'user-logged-in': { userId: number }
}

const emitter = mitt<Events>()

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bus: emitter,
    },
  }
})
