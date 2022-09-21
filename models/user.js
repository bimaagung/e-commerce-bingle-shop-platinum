'use strict'
const {Model} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.address, {
        foreignKey: {name: 'user_id', allowNull: false},
        as: 'address',
      })

      this.hasMany(models.Order, {
        foreignKey: {name: 'user_id', allowNull: false},
        as: 'orders',
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      telp: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  )
  return User
}
