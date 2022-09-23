module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'ProductImages',
        [
          {
            url : process.env.ITEM_URL,
            product_id : 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 6,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 7,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 8,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : process.env.ITEM_URL,
            product_id : 9,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
      )
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('ProductImages', null, {})
    },
  }
  