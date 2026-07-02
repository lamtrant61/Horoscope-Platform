/* eslint-disable */
'use strict';

const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  async up (queryInterface, Sequelize) {
    const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 10;
    const users = [
      {
        name: 'Admin',
        username: 'lamtt',
        password: bcrypt.hashSync('310898', saltRounds),
        role: 'manager',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Demo',
        username: 'demo',
        password: bcrypt.hashSync('user123', saltRounds),
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ];
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      username: ['lamtt', 'demo']
    }, {});
  }
};