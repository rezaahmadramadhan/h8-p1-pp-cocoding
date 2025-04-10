const { error } = require('daisyui/src/colors')
const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.get('/', Controller.homePage)

router.use('/', require("./auth"))
router.use('/courses', require("./courses"))
router.use('/profile', require("./profile"))


module.exports = router