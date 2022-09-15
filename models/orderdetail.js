'use strict'
const {Model} = require('sequelize')
const {nanoid} = require('nanoid')
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: {name: 'order_id', allowNull: false},
        as: 'order',
      })
    }
  }
  OrderDetail.init(
    {
      user_id: DataTypes.INTEGER,
      order_id: DataTypes.STRING(16),
      product_id: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'OrderDetail',
    },
  )
  return OrderDetail
}
