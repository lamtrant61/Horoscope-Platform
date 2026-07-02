import dotenv from 'dotenv'
import { Transaction } from '~/server/database/models'
import { responseMsg, responseData } from '~/server/utils/response'
dotenv.config()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const userId = event.context.user.id
  const { amount } = body
  if (!amount) return responseMsg(false, 'Không thể tạo mã QR')

  const accountNumber = process.env.ACCOUNT_NUMBER
  if (!accountNumber) return responseMsg(false, 'Không thể tạo mã QR đến stk')

  const newTransaction = await Transaction.create({
    user_id: userId,
    amount,
  })
  if (!newTransaction)
    return responseMsg(false, 'Tạo mã QR thất bại, vui lòng thử lại sau')

  const content = `TVTM${userId} ${newTransaction.dataValues.id}TVTM`
  const qrData = {
    transaction_id: newTransaction.dataValues.id,
    qrLink: `https://img.vietqr.io/image/TPB-${accountNumber}-print.png?amount=${amount}&addInfo=${content}`,
  }
  return responseData(qrData, 'Tạo mã thanh toán thành công')
})
