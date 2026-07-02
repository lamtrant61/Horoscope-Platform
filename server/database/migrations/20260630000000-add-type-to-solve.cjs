/* eslint-disable */
'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('solves', 'type', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('solves', 'type')
  },
}
