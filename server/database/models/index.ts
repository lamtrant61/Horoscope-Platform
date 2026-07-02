import { User } from './User'
import { Horoscope } from './Horoscope'
import { Solve } from './Solve'
import { Payment } from './Payment'
import { Transaction } from './Transaction'

// User 1 - N Horoscope
User.hasMany(Horoscope, { foreignKey: 'user_id', as: 'horoscopes' })
Horoscope.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' })
Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

// Horoscope 1 - N Solve
Horoscope.hasMany(Solve, { foreignKey: 'horoscope_id', as: 'solves' })
Solve.belongsTo(Horoscope, { foreignKey: 'horoscope_id', as: 'horoscope' })

export { User, Horoscope, Solve, Payment, Transaction }
