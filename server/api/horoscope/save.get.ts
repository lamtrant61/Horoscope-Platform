import { responseMsg, responseData } from '~/server/utils/response'
import { Horoscope, Solve } from '~/server/database/models'

interface query {
  page?: string
  limit?: string
}

export default defineEventHandler(async (event) => {
  const userId = event.context.user.id
  const query: query = getQuery(event)
  const page = query.page ? parseInt(query.page) || 1 : 1
  const limit = query.limit ? parseInt(query.limit) || 10 : 10
  const offset = (page - 1) * limit

  const { count, rows } = await Horoscope.findAndCountAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: Solve,
        as: 'solves',
        attributes: ['id', 'data', 'type'],
        where: {
          type: 1,
        },
        required: false,
      },
    ],
    limit,
    offset,
    order: [['created_at', 'DESC']],
  })
  if (!rows.length) {
    return responseMsg(false, 'Không tìm thấy lá số tử vi')
  }
  rows.forEach((item) => {
    if (item.dataValues.solves.length) {
      item.dataValues.isSolve = 1
    } else {
      item.dataValues.isSolve = 2
    }
  })
  return responseData(
    { total: count, list: rows },
    'Lấy danh sách lá số tử vi thành công',
  )
})
