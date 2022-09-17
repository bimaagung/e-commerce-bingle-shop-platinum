module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          name: 'Laptop',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'handphone',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'tablet',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'AirPods',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  },
}
