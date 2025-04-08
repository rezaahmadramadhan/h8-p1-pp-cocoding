'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Profile, {foreignKey: "ProfileId"})
      Transaction.belongsTo(models.Course, {foreignKey: "CourseId"})
    }
  }
  Transaction.init({
    dateTrans: DataTypes.DATE,
    course: DataTypes.STRING,
    totalPrice: DataTypes.INTEGER,
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Courses",
        key: "id"
      }
    },
    ProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Profiles",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};