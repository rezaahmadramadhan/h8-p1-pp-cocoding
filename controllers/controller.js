const bcryptjs = require('bcryptjs')
const { where, Op } = require('sequelize')
const { formatRp, formatLevel, formatDuration } = require('../helpers/helper')
const {Category, Course, Profile, Transaction, User} = require('../models')

class Controller {
    static async homePage(req, res) {
        try {
            const {error} = req.query
            const {user} = req.session
                
            res.render('homePage', {error, user})
        } catch (error) {
            res.send(error)
        }
    }

    static async showCourse(req, res) {
        try {
            const {search, cat} = req.query 
            const {error} = req.query
            const {user} = req.session  

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
                
            res.render('showCourse', {data, error, user, formatRp})  
        } catch (error) {
            res.send(error)
        }
    }

    static async buyCourse(req, res) {
        try {
            res.render('buyCourse')
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
                    req.session.user = {userId: data.id, name: data.username, role: data.role}

                    res.redirect('/')
                } else {
                    res.redirect(`/login?error=Invalid Password, Please Try Again!`)
                }
            } else {
                res.redirect(`/login?error=Username not Found, Please Sign Up First!`)
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
            res.send(error)
        }
    }

    static async detailCourse(req, res) {
        try {
            const {id} = req.params
            const {error} = req.query
            const {user} = req.session

            let data = (await Course.findAll({
                where: {id},
                include: {
                    model: Category
                }
            }))[0]

            res.render('detailCourse', {data, user, error, formatRp})
        } catch (error) {
            res.send(error)
        }
    }    

    static async editCourse(req,res) {
        try {
            const {id} = req.params
            let data = (await Course.findAll({
                where: {id},
                include: {
                    model: Category
                }
            }))[0]

            let cat = await Category.findAll()

            res.render('editCourse', {data, cat})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditCourse(req, res) {
        try {
            const {id} = req.params
            await Course.update(req.body, {
                where: {id}
            })
            
            res.redirect("/courses")
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteCourse(req, res) {
        try {
            const {id} = req.params
            await Course.destroy({where: {id}})

            res.redirect("/courses")
        } catch (error) {
            res.send(error)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) res.send(err)
                else res.redirect('/')
            })
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controller