const bcryptjs = require('bcryptjs')
const { where, Op } = require('sequelize')
const { formatRp, formatLevel, formatDuration } = require('../helpers/helper')
const {Category, Course, Profile, Transaction, User} = require('../models')

class Controller {
    static async homePage(req, res) {
        try {
            res.render('homePage')
        } catch (error) {
            res.send(error)
        }
    }

    static async showCourse(req, res) {
        try {
            const {search, cat} = req.query   

            let data = await Course.findAll({
                include: {
                    model: Category
                }
            })

            if(search) {
                data = await Course.findAll({
                    where: {name: {[Op.iLike]: `%${search}%`}},
                    include: {
                        model: Category
                    }
                })
            }

            if(cat) {
                data = await Course.findAll({
                    include: {
                        model: Category,
                        where: {name: cat}
                    }
                })
            }

            res.render('showCourse', {data, formatRp, formatLevel})  
        } catch (error) {
            res.send(error)
        }
    }

    static async signUp(req, res) {
        try {
            await User.create(req.body)

            res.redirect("/login")
        } catch (error) {
            res.send(error)
        }
    }

    static async login(req,res) {
        try {
            const {error} = req.query
            
            res.render('loginSignUp', {error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postLogin(req, res) {
        try {
            const {username, password} = req.body            
            const data = await User.findOne({where: {username}})
            
            if (data) {
                const isValidPass = bcryptjs.compareSync(password, data.password)
                
                if (isValidPass) {
                    req.session.user = {userId: data.id, role: data.role}

                    return res.redirect('/')
                } else {
                    return res.redirect(`/login?error=Invalid Password, Please Try Again!`)
                }
            } else {
                return res.redirect(`/login?error=Username not Found, Please Sign Up First!`)
            }
        } catch (error) {
            res.send(error)
        }
    }

    static async addCourse(req, res) {
        try {
            let data = await Category.findAll()
            
            res.render('addCourse', {data})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddCourse(req, res) {
        try {
            await Course.create(req.body)
            
            res.redirect("/courses")
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }
}

module.exports = Controller