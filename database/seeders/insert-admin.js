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
          image: 'https://res.cloudinary.com/dnvltueqb/image/upload/v1663376529/profile_kdnkg8.png',
          telp: null,
          is_admin: true,
          email:'admin@mail.com',
          password: bcrypt.hashSync('123456', 10),
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
