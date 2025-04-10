const express = require('express')
const Controller = require('../controllers/controller')
const auth = express.Router()

auth.post('/signUp', Controller.signUp)
auth.get('/login', Controller.login)
auth.post('/login', Controller.postLogin)
auth.get('/logout', Controller.logout)

module.exports = auth