import { Sequelize, Dialect } from 'sequelize'
// import { User } from '../database/models/User'
// Đường dẫn tới file config
import config from '../database/config/config.cjs'

// Lấy cấu hình theo NODE_ENV (mặc định là development)
type Env = 'development' | 'test' | 'production'
const env = (process.env.NODE_ENV as Env) || 'development'
const dbConfig = config[env]

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: Number(dbConfig.port),
    dialect: dbConfig.dialect as Dialect,
    logging: false,
  },
)

// Nếu cần tự động sync model
sequelize.sync()
