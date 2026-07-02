import { Op } from 'sequelize'
import { responseMsg, responseData } from '~/server/utils/response'
import { User } from '~/server/database/models'

interface query {
  q?: string
  page?: string
  limit?: string
}

// admin lay danh sach user
export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const query: query = getQuery(event)
  const page = query.page ? parseInt(query.page) || 1 : 1
  const limit = query.limit ? parseInt(query.limit) || 10 : 10
  const q = query.q ? (query.q as string) : ''
  const offset = (page - 1) * limit

  const checkUser = await User.findByPk(userId)
  if (!checkUser) {
    return responseMsg(false, 'Người dùng không tồn tại')
  }
  if (checkUser.dataValues.role !== 'admin') {
    return responseMsg(false, 'Bạn không có quyền truy cập')
  }
  const whereCondition: any = {}
  if (q) whereCondition.username = { [Op.like]: `%${q}%` }
  const { count, rows } = await User.findAndCountAll({
    where: whereCondition,
    limit,
    offset,
    order: [['created_at', 'DESC']],
  })
  if (!rows.length) {
    return responseMsg(false, 'Không tìm thấy người dùng')
  }
  return responseData(
    { total: count, list: rows },
    'Lấy danh sách người dùng thành công',
  )
})
