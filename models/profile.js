'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {foreignKey: "UserId"})
      Profile.hasMany(models.Transaction, {
        foreignKey: "ProfileId"  
      })
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    address: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  Profile.beforeCreate(el => {
    el.name = ""
    el.age = 0
    el.address = ""
    el.phone = ""
  })
  return Profile;
};