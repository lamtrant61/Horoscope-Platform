import { responseMsg, responseData } from '../../utils/response'
import { getFullHoroscope, sumaryHandleHoroscope } from '../../utils/horoscope'
interface BodyHoroscope {
  name: string
  is_male: string
  date: string
  time: string
  year?: number
}

export default defineEventHandler(async (event) => {
  const method: string | undefined = event.node.req.method
  if (method !== 'POST') {
    return responseMsg(true, 'API không hỗ trợ phương thức này')
  }
  const body: BodyHoroscope = await readBody(event)

  if (!body?.name || !body?.is_male || !body?.date || !body?.time) {
    return responseMsg(true, 'Không đủ thông tin')
  }
  let astrolabe = getFullHoroscope(body.date, body.time, body.is_male)
  astrolabe = sumaryHandleHoroscope(astrolabe, body)
  return responseData(astrolabe)
})
