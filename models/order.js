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
      // define association here
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
    },
    {
      sequelize,
      modelName: 'Order',
    },
  )
  return Order
}
