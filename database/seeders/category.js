module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Category',
      [
        {
          name: 'Leptop',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'MS Office 365',
          description: 'Software MS Office 365 2 years subscription',
          category_id: 2,
          sold: 0,
          price: 1000000,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ipad Air 2022',
          description: 'Apple Ipad Air with Chip M1 2022',
          category_id: 3,
          sold: 0,
          price: 10000000,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AirPods',
          description: 'Apple AirPods 3rd generation with audio spatial',
          category_id: 4,
          sold: 0,
          price: 2300000,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Category', null, {})
  },
}
