import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../database/models/User' // Giả sử bạn đã định nghĩa model User trong thư mục models
import { responseMsg, responseData } from '../utils/response'
dotenv.config()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  let { username, password } = body
  username = username?.trim()
  password = password?.trim()

  if (!username || !password) {
    return responseMsg(false, 'Thiếu thông tin')
  }

  // Sử dụng Sequelize để tìm user
  const user = await User.findOne({ where: { username } })
  if (!user) {
    return responseMsg(false, 'Tài khoản hoặc mật khẩu không đúng')
  }

  // Check hash password
  const isPasswordValid = await bcrypt.compare(
    password,
    user.get('password') as string,
  )
  if (!isPasswordValid) {
    return responseMsg(false, 'Tài khoản hoặc mật khẩu không đúng')
  }

  // Create token
  const token = jwt.sign(
    { id: user.get('id'), username: user.get('username') }, // payload
    process.env.JWT_SECRET || 'secret_key', // secret
    { expiresIn: '7d' }, // thời hạn token
  )

  // Trả về thông tin người dùng
  const userData = {
    id: user.get('id'),
    username: user.get('username'),
    token,
    createdAt: user.get('createdAt'),
  }
  return responseData(userData, 'Đăng nhập thành công')
})
