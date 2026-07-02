/* eslint-disable */
'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();
const saltRounds = process.env.SALT ? parseInt(process.env.SALT) : 10;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM('admin', 'user', 'manager'),
        allowNull: false,
        defaultValue: 'user',
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
    await queryInterface.addIndex('users', ['role'], {
      name: 'users_role_index'
    });
    // Thêm user admin mặc định
    const hashedPassword = await bcrypt.hash('310898', saltRounds);
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      username: 'admin',
      password: hashedPassword, // Nên hash mật khẩu ở production!
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('users');
  }
};
