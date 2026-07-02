import { User } from '~/server/database/models'
import { responseMsg, responseData } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const resData = {
    balance: null,
  }
  const userBalance = await User.findByPk(userId)
  if (!userBalance) return responseMsg(false, 'Không tìm thấy tài khoản')
  resData.balance = userBalance.dataValues.balance
  return responseData(resData, 'Thanh toán thành công')
})
