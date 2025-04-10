const { error } = require('daisyui/src/colors')
const Controller = require('../controllers/controller')
const express = require('express')
const router = express.Router()

const login = function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login?error=Please login first!')
    } else {
        next()
    }
}

let adminRole = function (req, res, next) {
    const {userId, role} = req.session.user
    
    if (userId && role !== "admin") {
        res.redirect(`/?error=Only Admin can Have Permission to Access this!!!`)
    } else {
        next()
    }
}

router.get('/', Controller.homePage)
router.post('/signUp', Controller.signUp)
router.get('/login', Controller.login)
router.post('/login', Controller.postLogin)
router.get('/courses', Controller.showCourse)
router.get('/courses/:id/detail', Controller.detailCourse)
router.get('/courses/add', login, adminRole, Controller.addCourse)
router.post('/courses/add', login, adminRole, Controller.postAddCourse)
router.get('/courses/:id/buy', login, Controller.buyCourse)
router.get('/courses/:id/edit', login, adminRole, Controller.editCourse)
router.post('/courses/:id/edit', login, adminRole, Controller.postEditCourse)
router.post('/courses/:id/edit', login, adminRole, Controller.postEditCourse)
router.get('/courses/:id/delete', login, adminRole, Controller.deleteCourse)
router.get('/profile/:id/edit', login, Controller.editProfile)
router.post('/profile/:id/edit', login, Controller.postEditProfile)
router.get('/logout', Controller.logout)



module.exports = router