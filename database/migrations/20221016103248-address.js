'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'addresses','main_address',Sequelize.BOOLEAN
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};