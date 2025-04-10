const express = require('express')
const Controller = require('../controllers/controller')
const { login } = require('../middleware/auth')
const profile = express.Router()

profile.get('/:id/edit', login, Controller.editProfile)
profile.post('/:id/edit', login, Controller.postEditProfile)


module.exports = profile