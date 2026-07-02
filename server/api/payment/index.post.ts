import { Payment, User } from '~/server/database/models'
import { responseMsg, responseData } from '~/server/utils/response'
import { sendPaymentNotificationTelegram } from '~/server/utils/telegram'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    gateway,
    transactionDate,
    accountNumber,
    content,
    transferAmount,
    id,
  } = body
  if (
    !gateway ||
    !transactionDate ||
    !accountNumber ||
    !content ||
    !transferAmount ||
    !id
  ) {
    return responseMsg(false, 'Thiếu thông tin')
  }
  // TVTM - user_id - transaction_id - TVTM
  const contentSplit = (content as string).split('TVTM')[1].split(' ')
  const userId = contentSplit[0]
  const transactionId = contentSplit[1]

  const newPayment = await Payment.create({
    user_id: userId,
    transaction_id: transactionId,
    id_sepay: id,
    bank: gateway,
    account_number: accountNumber,
    content,
    transaction_date: transactionDate,
    amount: transferAmount,
    json_sepay: JSON.stringify(body),
  })
  const logData = {
    user_id: userId,
    transaction_id: transactionId,
    id_sepay: id,
    amount: transferAmount,
  }
  console.log(logData, '\n\n\nCó chuyển khoản nè!!!\n\n\n')

  // Bắn telegram
  const formNotify = `
  <b>Thông báo có giao dịch mới</b>
  - User ID: <b>${userId}</b>
  - Mã giao dịch: <b>${transactionId}</b>
  - Số tiền: <b>${transferAmount.toLocaleString('vi-VN')} VND</b>
  - Ngày giao dịch: ${transactionDate}
  `
  await sendPaymentNotificationTelegram(formNotify)

  if (!newPayment) console.log('Không lưu đc thông tin chuyển khoản!!!\n\n\n')

  const updateUser = await User.findByPk(userId)
  if (!updateUser)
    return responseMsg(
      false,
      'Thanh toán thất bại, vui lòng liên hệ quản trị viên để được hỗ trợ.',
    )
  const currentBalance = updateUser.dataValues.balance
  ;(updateUser as any).balance =
    parseInt(currentBalance) + parseInt(transferAmount)
  await updateUser.save()
  return responseMsg(true, 'Lưu thông tin thanh toán thành công')
})
