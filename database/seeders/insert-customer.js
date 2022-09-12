const bcrypt = require("bcrypt")
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'customer',
          username: 'customer',
          image: null,
          telp: 082311111,
          is_admin: false,
          email:'customern@mail.com',
          password: bcrypt.hashSync('123456', 10),
          address_id:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
