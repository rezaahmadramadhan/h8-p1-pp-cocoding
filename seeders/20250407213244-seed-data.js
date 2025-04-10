'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let dataCategory = require('../data/category.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   let dataCourse = require('../data/course.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   await queryInterface.bulkInsert('Categories', dataCategory, {})
   await queryInterface.bulkInsert('Courses', dataCourse, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Courses', null, {})
  }
};
