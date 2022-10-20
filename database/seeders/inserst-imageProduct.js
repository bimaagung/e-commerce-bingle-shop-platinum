const defaultImage = require('../../internal/constant/defaultImage')
module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert(
        'ProductImages',
        [
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 6,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 7,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
            product_id : 8,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            url : defaultImage.DEFAULT_PRODUCT_IMAGE,
            cover_image : true,
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
  