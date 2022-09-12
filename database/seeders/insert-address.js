'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'addresses',
      [
        {
          province: 'Jawa Barat',
          city: 'Garut',
          postal_code: 44151,
          detail: 'Jl.Pembangunan no 56 kec.Sukaregang',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {})
  },
}
