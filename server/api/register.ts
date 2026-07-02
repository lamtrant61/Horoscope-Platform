import bcrypt from 'bcrypt'
import { User } from '../database/models/User' // Đảm bảo đã định nghĩa model User trong thư mục models
import { responseMsg, responseData } from '../utils/response'

// Đăng ký tài khoản
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let { name, username, password } = body
  name = name?.trim()
  username = username?.trim()
  password = password?.trim()

  if (!name || !username || !password) {
    return responseMsg(false, 'Thiếu thông tin đăng ký.')
  }

  // Kiểm tra tài khoản đã tồn tại chưa
  const existed = await User.findOne({ where: { username } })
  if (existed) {
    return responseMsg(false, 'Tài khoản đã tồn tại.')
  }

  // Hash password
  const saltNum = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
  const hashedPassword = await bcrypt.hash(password, saltNum)
  const newUser = await User.create({
    name,
    username,
    password: hashedPassword,
  })
  if (!newUser) {
    return responseMsg(false, 'Đăng ký thất bại.')
  }
  // Trả về thông tin người dùng mới
  const userData = {
    id: newUser.get('id'),
    name: newUser.get('name'),
    username: newUser.get('username'),
    createdAt: newUser.get('createdAt'),
  }
  return responseData(userData, 'Đăng ký thành công.')
})
