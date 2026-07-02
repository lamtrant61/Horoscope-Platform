import { responseMsg, responseData } from '~/server/utils/response'
import { Horoscope } from '~/server/database/models/Horoscope'

interface BodyHoroscope {
  name: string
  is_male: string
  date: string
  time: string
  year?: number
}

export default defineEventHandler(async (event) => {
  const body: BodyHoroscope = await readBody(event)
  const newHoroscope = await Horoscope.create({
    user_id: event.context.user.id,
    name: body.name,
    is_male: body.is_male,
    date: body.date,
    time: body.time,
  })
  if (!newHoroscope) {
    return responseMsg(false, 'Lưu lá số tử vi thất bại')
  }
  return responseData(newHoroscope, 'Lưu lá số tử vi thành công')
})
