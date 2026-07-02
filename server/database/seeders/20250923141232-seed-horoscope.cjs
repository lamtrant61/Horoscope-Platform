/* eslint-disable */
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Đọc file JSON
    const dataPath = path.join(__dirname, '../data', 'horoscope.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const horoscopeData = JSON.parse(rawData);

    // Map và hash password
    const horoscopes = horoscopeData.map(horoscope => ({
      ...horoscope,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('horoscopes', horoscopes, {});
  },

  async down(queryInterface, Sequelize) {
    // Lấy danh sách từ file JSON
  },
};
