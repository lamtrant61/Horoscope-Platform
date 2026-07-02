import jwt from 'jsonwebtoken'
import { invalidTokenMsg } from '../utils/response'

const getInfoUri = async (event: any) => {
  // --- Lấy thông tin request ---
  const reqLog: any = {
    url: event.node.req.url,
    method: event.node.req.method,
    query: { ...getQuery(event) },
    body: ['POST', 'PUT', 'PATCH'].includes(event.node.req.method || '')
      ? await readBody(event)
      : null,
  }
  // console.log(
  //   '\n\n\n!!!!!!!!!! URL PARAMS !!!!!!!!!\n\n\n',
  //   `url: ${reqLog.url}\n method: ${reqLog.method}\n query: ${JSON.stringify(reqLog.query)}\n body: ${JSON.stringify(reqLog.body)}`,
  //   '\n\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\n\n',
  // )
}

export default defineEventHandler((event) => {
  const listApiPrivate = [
    '/api/user',
    '/api/openai',
    '/api/manage',
    '/api/horoscope/save',
    '/api/payment/createqr',
    '/api/payment/check',
  ]
  try {
    listApiPrivate.forEach((api) => {
      const apiSolve = '/api/openai/solve'
      if (event.path.startsWith(api)) {
        const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
        // Đoạn này sẽ cho phép qua khi xem lá số mẫu
        if (event.path.startsWith(apiSolve)) {
          try {
            if (!token) {
              event.context.user = null
              return
            }
            const decoded = jwt.verify(
              token,
              process.env.JWT_SECRET || 'secret_key',
            )
            event.context.user = decoded
          } catch (err) {
            //
          } finally {
            // eslint-disable-next-line no-unsafe-finally
            return
          }
        }
        if (!token) {
          setResponseStatus(event, 401)
          return event.node.res.end(JSON.stringify(invalidTokenMsg()))
          // return invalidTokenMsg()
        }

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'secret_key',
        )
        event.context.user = decoded
      }
      getInfoUri(event)
    })
  } catch (err) {
    console.log(err)
    // return invalidTokenMsg()
    setResponseStatus(event, 401)
    return event.node.res.end(JSON.stringify(invalidTokenMsg()))
  }
})
