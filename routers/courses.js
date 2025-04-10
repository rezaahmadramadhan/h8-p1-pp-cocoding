const express = require('express')
const Controller = require('../controllers/controller')
const { login, seller } = require('../middleware/auth')
const courses = express.Router()

courses.get('/', Controller.showCourse)
courses.get('/:id/detail', Controller.detailCourse)
courses.get('/add', login, seller, Controller.addCourse)
courses.post('/add', login, seller, Controller.postAddCourse)
courses.get('/:id/buy', login, Controller.buyCourse)
courses.post('/:id/buy', login, Controller.postBuyCourse)
courses.get('/:id/edit', login, seller, Controller.editCourse)
courses.post('/:id/edit', login, seller, Controller.postEditCourse)
courses.get('/:id/delete', login, seller, Controller.deleteCourse)
courses.get('/profile/:id/edit', login, Controller.editProfile)
courses.post('/profile/:id/edit', login, Controller.postEditProfile)


module.exports = courses