import { responseMsg, responseData } from '~/server/utils/response'
import { Horoscope } from '~/server/database/models/Horoscope'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const userId = event.context.user.id

  if (!id) return responseMsg(false, 'Thiếu thông tin id')

  const horoscope = await Horoscope.findOne({
    where: {
      id,
      user_id: userId,
    },
  })
  if (!horoscope) {
    return responseMsg(false, 'Không tìm thấy lá số tử vi')
  }
  await horoscope.destroy()
  return responseMsg(true, 'Xoá lá số tử vi thành công')
})
