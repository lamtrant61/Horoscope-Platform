import { responseMsg, responseData } from '~/server/utils/response'
import { User } from '~/server/database/models'

interface bodyUpdate {
  userUpdateId: string
  balance: string
}

// admin update balance user
export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const body: bodyUpdate = await readBody(event)

  const checkUser = await User.findByPk(userId)
  if (!checkUser) {
    return responseMsg(false, 'Người dùng không tồn tại')
  }
  if (checkUser.dataValues.role !== 'admin') {
    return responseMsg(false, 'Bạn không có quyền truy cập')
  }

  const checkUserUpdate = await User.findByPk(body.userUpdateId)
  if (!checkUserUpdate) {
    return responseMsg(false, 'Người dùng không tồn tại')
  }
  checkUserUpdate.dataValues.balance = parseInt(body.balance) || 0
  await checkUserUpdate.save()
  return responseMsg(true, 'Cập nhật người dùng thành công')
})
