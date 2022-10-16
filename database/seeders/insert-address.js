'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'addresses',
      [
        {
          province: 'Jawa Barat',
          city: 'Garut',
          postal_code: "44151",
          detail: 'Jl.Pembangunan no 56 kec.Sukaregang',
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
          main_address: true
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {})
  },
}
