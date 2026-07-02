/* eslint-disable */
'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Đọc file JSON
    const dataPath = path.join(__dirname, '../data', 'solve.json');
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const solveData = JSON.parse(rawData);

    // Map và hash password
    const solves = solveData.map(solve => ({
      ...solve,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert('solves', solves, {});
  },

  async down(queryInterface, Sequelize) {
    // Lấy danh sách từ file JSON
  },
};
