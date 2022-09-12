'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Address,{
        foreignKey:{name: 'address_id', allowNull:false}
      })
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