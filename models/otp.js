'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otp.init({
    email: DataTypes.STRING,
    otp_type: DataTypes.STRING,
    otp_code: DataTypes.STRING,
    expired_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};