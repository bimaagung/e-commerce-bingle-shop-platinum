'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: {name : 'category_id', allowNull:false}
      })
    }
  }
  Category.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};