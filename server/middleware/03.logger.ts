import { readBody, getRequestURL, getResponseStatus } from 'h3'
import { logger } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (!url.pathname.startsWith('/api')) {
    return
  }
  const start = Date.now()
  const headers = event.headers
  // Đọc body 1 lần trong middleware
  let body: any = null
  if (['POST', 'PUT', 'PATCH'].includes(event.method)) {
    try {
      body = await readBody(event)
    } catch (err) {
      body = '[Cannot parse body]'
    }
  }

  // Log response sau khi gửi xong
  event.node.res.on('finish', () => {
    const duration = Date.now() - start
    logger.info({
      type: 'response',
      method: event.method,
      url: url.pathname,
      user_id: event.context.user ? event.context.user.id : null,
      query: url.search,
      body,
      statusCode: getResponseStatus(event),
      duration: `${duration}ms`,
    })
  })
})
