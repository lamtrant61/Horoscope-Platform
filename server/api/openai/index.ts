import { astro } from 'iztro'
import dotenv from 'dotenv'
import { handleTime, getMoonYear } from '../../utils/common'
import {
  responseMsg,
  responseData,
  responseBalance,
} from '../../utils/response'
import { getFullHoroscope, sumaryHandleHoroscope } from '../../utils/horoscope'
import { horoscopeBot } from '../../utils/openai'
import { User, Horoscope, Solve } from '~/server/database/models'
dotenv.config()

interface BodyHoroscope {
  name: string
  is_male: string
  date: string
  time: string
  year?: number
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  const costHoroscope = parseInt(process.env.COST_HOROSCOPE || '50000')
  const formatCostHoroscope = costHoroscope.toLocaleString('vi-VN')
  const method: string | undefined = event.node.req.method
  if (method !== 'POST') {
    return responseMsg(false, 'API không hỗ trợ phương thức này')
  }
  const userId = event.context.user.id
  const bodyReq: any = await readBody(event)
  if (!bodyReq.id || !userId) return responseMsg(false, 'Không đủ thông tin')

  const userInfo = await User.findByPk(userId)
  if (!userInfo) return responseMsg(false, 'Người dùng không tồn tại')
  const userBalance = userInfo.dataValues.balance || 0
  if (userBalance < costHoroscope) {
    return responseBalance(
      `Số dư tài khoản không đủ, vui lòng nạp thêm tối thiểu ${formatCostHoroscope}đ để sử dụng dịch vụ luận giải lá số tử vi.`,
    )
  }

  const dataHoroscope = await Horoscope.findOne({
    where: {
      id: bodyReq.id,
      user_id: userId,
    },
  })
  if (!dataHoroscope) return responseMsg(false, 'Không tìm thấy lá số tử vi')
  const bodyHoroscope: BodyHoroscope = dataHoroscope.dataValues

  let astrolabe = getFullHoroscope(
    bodyHoroscope.date,
    bodyHoroscope.time,
    bodyHoroscope.is_male,
  )
  astrolabe = sumaryHandleHoroscope(astrolabe, bodyHoroscope)
  let dataSolveHoroscope = ''

  const checkSolveHoroscope = await Solve.findOne({
    where: {
      horoscope_id: bodyHoroscope.id,
      type: 1,
    },
  })
  if (checkSolveHoroscope) {
    dataSolveHoroscope = checkSolveHoroscope.dataValues.data
  } else {
    // Trừ tiền trong tài khoản
    const newBalance = userBalance - costHoroscope
    await userInfo.update({ balance: newBalance })
    dataSolveHoroscope = await horoscopeBot(astrolabe)
    console.log(
      dataSolveHoroscope,
      '\n----------\nLuận giải lá số thành công!!!!!',
    )
    const newSolveHoroscope = await Solve.create({
      horoscope_id: bodyHoroscope.id,
      data: dataSolveHoroscope,
      type: 1,
    })
    if (!newSolveHoroscope)
      return responseMsg(
        false,
        'Có lỗi xảy ra trong quá trình luận giải, vui lòng liên hệ quản trị viên để được hỗ trợ.',
      )
  }
  ;(astrolabe as any).solveData = dataSolveHoroscope
  return responseData(astrolabe)
})
