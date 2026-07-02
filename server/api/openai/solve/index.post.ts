import { responseMsg, responseData } from '../../../utils/response'
import {
  getFullHoroscope,
  sumaryHandleHoroscope,
} from '../../../utils/horoscope'
import { Horoscope } from '~/server/database/models/Horoscope'
import { Solve } from '~/server/database/models/Solve'
import { BodyHoroscope } from '~/server/types/horoscope'

export default defineEventHandler(async (event) => {
  const method: string | undefined = event.node.req.method
  if (method !== 'POST') {
    return responseMsg(false, 'API không hỗ trợ phương thức này')
  }
  const getListAllow = await Horoscope.findAll({
    attributes: ['id'],
    where: {
      user_id: 2,
    },
  })

  const listAllow: number[] = getListAllow.map((item) => item.dataValues.id)
  const userId = event.context.user ? event.context.user.id : null
  const bodyReq: any = await readBody(event)
  const solveType = parseInt(bodyReq.type) || 1
  if (!bodyReq.id) return responseMsg(false, 'Không đủ thông tin')

  const whereCondition: any = {
    id: bodyReq.id,
  }

  if (listAllow.includes(parseInt(bodyReq.id))) {
    // Nếu đạt đk này trc thì out luôn, ko chạy đk sau
  } else if (userId !== 1) {
    whereCondition.user_id = userId
  }

  const dataHoroscope = await Horoscope.findOne({
    where: { ...whereCondition },
  })
  if (!dataHoroscope)
    return responseMsg(
      false,
      'Không tìm thấy lá số tử vi hoặc bạn không có quyền truy cập lá số này.',
    )
  const bodyHoroscope: BodyHoroscope = dataHoroscope.dataValues

  let astrolabe = getFullHoroscope(
    bodyHoroscope.date,
    bodyHoroscope.time,
    bodyHoroscope.is_male,
  )
  astrolabe = sumaryHandleHoroscope(astrolabe, bodyHoroscope)

  const checkSolveHoroscope = await Solve.findOne({
    where: {
      horoscope_id: bodyHoroscope.id,
      type: solveType,
    },
  })
  if (checkSolveHoroscope) {
    const dataSolveHoroscope = checkSolveHoroscope.dataValues.data
    ;(astrolabe as any).solveData = dataSolveHoroscope
  }
  return responseData(astrolabe)
})
