'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'OPPO 11 PRO',
          description: 'lorem ipsum ammet',
          category_id: 2,
          sold: 0,
          price: 2500000,
          stock:100,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
            name: 'Asus GTX 5000',
            description: 'lorem ipsum ammet',
            category_id: 1,
            sold: 0,
            price: 2500000,
            stock:100,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Samsung note 15',
            description: 'lorem ipsum ammet',
            category_id: 3,
            sold: 0,
            price: 2500000,
            stock:100,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: 'Playstation 5',
            description: 'lorem ipsum ammet',
            category_id: 1,
            sold: 0,
            price: 9500000,
            stock:100,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {})
  },
}
