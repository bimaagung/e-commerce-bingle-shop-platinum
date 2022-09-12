'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      this.belongsTo(models.address, {
        foreignKey: { name: 'address_id', allowNull: false },
        as: 'address',
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    image: DataTypes.STRING,
    telp: DataTypes.INTEGER,
    is_admin: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};