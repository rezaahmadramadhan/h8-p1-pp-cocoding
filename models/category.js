'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Course, {foreignKey: "CategoryId"})
    }
  }
  Category.init({
    name: DataTypes.STRING,
    progLang: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};