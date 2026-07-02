import { User } from '~/server/database/models'
import { responseMsg, responseData } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const userRole = await User.findByPk(userId)
  if (!userRole) return responseMsg(false, 'Không tìm thấy tài khoản')
  return responseData(
    { role: userRole.dataValues.role },
    'Lấy thông tin vai trò thành công',
  )
})
