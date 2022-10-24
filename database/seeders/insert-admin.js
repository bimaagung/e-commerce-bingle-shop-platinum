const bcrypt = require("bcrypt")
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'admin',
          username: 'admin',
          image: process.env.PROFIL_URL,
          telp: null,
          is_admin: true,
          email:'admin@mail.com',
          password: bcrypt.hashSync('password', 10),
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