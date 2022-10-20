'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: { name: 'user_id', allowNull: false },
        // as: 'address',
      });
    }
  }
  address.init({
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.STRING,
    detail: DataTypes.STRING,
    user_id : DataTypes.INTEGER,
    main_address: DataTypes.BOOLEAN 
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};