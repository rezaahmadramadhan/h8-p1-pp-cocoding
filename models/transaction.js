'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Profile, { foreignKey: 'ProfileId' })
      Transaction.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  }
  Transaction.init({
    dateTrans: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Transaction Date is required"
        },
        notEmpty: {
          msg: "Transaction Date is required"
        }
      }
    },
    course: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Course is required"
        },
        notEmpty: {
          msg: "Course is required"
        }
      }
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Total Price is required"
        },
        notEmpty: {
          msg: "Total Price is required"
        }
      }
    },
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