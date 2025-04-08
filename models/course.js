'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.Category, {foreignKey: "CategoryId"})
      Course.hasMany(models.Transaction, {
        foreignKey: "CourseId"  
      })
    }
  }
  Course.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    duration: DataTypes.INTEGER,
    quota: DataTypes.INTEGER,
    dateStart: DataTypes.DATE,
    price: DataTypes.INTEGER,
    img: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  Course.beforeCreate(el => {
    el.code = el.name
      ?.toLowerCase() // Menggunakan optional chaining
      ?.split(' ')
      ?.map(word => word.slice(0, 3))
      ?.join('_') || 'default_code'; // Fallback value
  });
  return Course;
};