'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   let dataUser = require('../data/user.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   let dataCategory = require('../data/category.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   let dataProfile = require('../data/profile.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   let dataCourse = require('../data/course.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   let dataTransaction = require('../data/transaction.json', 'utf-8').map(el => {
    delete el.id,
    el.createdAt = el.updatedAt = new Date()
    return el
   })

   await queryInterface.bulkInsert('Users', dataUser, {})
   await queryInterface.bulkInsert('Categories', dataCategory, {})
   await queryInterface.bulkInsert('Profiles', dataProfile, {})
   await queryInterface.bulkInsert('Courses', dataCourse, {})
   await queryInterface.bulkInsert('Transactions', dataTransaction, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Profiles', null, {})
    await queryInterface.bulkDelete('Courses', null, {})
    await queryInterface.bulkDelete('Transactions', null, {})
  }
};
