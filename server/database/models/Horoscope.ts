import { DataTypes } from 'sequelize'
import { sequelize } from '../../utils/sequelize'

export const Horoscope = sequelize.define(
  'Horoscope',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER, // user_id = 2 thi se cho hien thi all user
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_male: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'horoscopes',
    timestamps: false,
  },
)
