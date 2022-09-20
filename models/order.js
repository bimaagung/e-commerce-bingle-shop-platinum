'use strict'
const {Model} = require('sequelize')
const {nanoid} = require('nanoid')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.OrderDetail, {
        foreignKey: {name: 'order_id', allowNull: false},
        as: 'order_details',
      })
      this.belongsTo(models.User, {
        foreignKey: {name: 'user_id', allowNull: false},
        as: 'user',
      })
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING(16),
        defaultValue: nanoid(16),
      },
      user_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
      completed_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  )
  return Order
}
