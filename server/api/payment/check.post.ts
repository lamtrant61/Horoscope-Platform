import { Payment } from '~/server/database/models'
import { responseData } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = event.context.user.id
  const resData = {
    status: 1,
  }
  let { transactionId } = body
  transactionId = parseInt(transactionId)
  if (!transactionId) {
    return responseData(resData, 'Thiếu thông tin')
  }
  const findPayment = await Payment.findOne({
    where: {
      user_id: userId,
      transaction_id: transactionId,
    },
  })
  if (!findPayment)
    return responseData(resData, 'Không tìm thấy thông tin thanh toán')
  resData.status = 0
  return responseData(resData, 'Thanh toán thành công')
})
