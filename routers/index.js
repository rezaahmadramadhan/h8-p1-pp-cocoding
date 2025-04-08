const { error } = require('daisyui/src/colors')
const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

router.post('/signUp', Controller.signUp)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)

router.use(function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login?error=Please login first!')
    } else {
        next()
    }
})

let adminRole = function (req, res, next) {
    const {userId, role} = req.session.user
    
    if (userId && role !== "admin") res.redirect(`/?error=Only Admin can Have Permission to Access this!!!`)
    next()
}

router.get('/', Controller.homePage)
router.get('/courses', Controller.showCourse)
router.get('/courses/add', adminRole, Controller.addCourse)
router.post('/courses/add', adminRole, Controller.postAddCourse)



module.exports = router