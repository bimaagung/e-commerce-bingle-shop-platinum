'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: {name : 'category_id', allowNull:false},
        as: 'category',
      })

      // this.belongTo(models.product, {
        //foreignKey: { name: 'category_id', allowNull:false},
        // as : 'category',
      //})

      this.hasMany(models.ProductImage, {
        foreignKey: {name : 'product_id', allowNull:false}
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    cover_imageID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};