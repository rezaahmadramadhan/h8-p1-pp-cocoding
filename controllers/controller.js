const bcryptjs = require('bcryptjs')
const { where, Op } = require('sequelize')
const { formatRp, formatLevel, formatDuration } = require('../helpers/helper')
const {Category, Course, Profile, Transaction, User} = require('../models')
const qr = require('qrcode')
const src = require('daisyui')

class Controller {
    static async homePage(req, res) {
        try {
            const {error, notif} = req.query
            const {user} = req.session            
                
            res.render('homePage', {error,notif, user})
        } catch (error) {
            console.log(error);
            
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

            const category = await Category.findAll()

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
                
            res.render('showCourse', {data,category, error, user, formatRp})  
        } catch (error) {
            console.log(error);
            
            res.send(error)
        }
    }

    static async buyCourse(req, res) {
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

            qr.toDataURL("https://www.emoderationskills.com/wp-content/uploads/2010/08/QR1.jpg", (err,src) => {
                res.render('buyCourse', {data, error, user, formatRp, qr: src})
            })
        } catch (error) {
            res.send(error)
        }
    }

    static async postBuyCourse(req, res) {
        try {
            const {course, totalPrice, CourseId} = req.body
            const {userId} = req.session.user
            const dateTrans = new Date()
            await Transaction.create({dateTrans, course, totalPrice, CourseId, ProfileId: userId})
            
            res.redirect(`/?notif=Selamat, Pembelian course ${course} berhasil!!!`)
        } catch (error) {
            res.send(error)
        }
    }

    static async signUp(req, res) {
        try {
            let user = await User.create(req.body)            
            await Profile.create({UserId: user.id})

            res.redirect("/login")
        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                
                res.redirect(`/login?error=${msg}`)
            } else{
                res.send(error)
            }
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
            const {error} = req.query
            const data = await Category.findAll()
            
            res.render('addCourse', {data, error})
        } catch (error) {
            res.send(error)
        }
    }

    static async postAddCourse(req, res) {
        try {
            await Course.create(req.body)
            
            res.redirect("/courses")
        } catch (error) {
            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                
                res.redirect(`/courses/add?error=${msg}`)
            } else{
                res.send(error)
            }
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
            const {error} = req.query
            let data = (await Course.findAll({
                where: {id},
                include: {
                    model: Category
                }
            }))[0]
            let cat = await Category.findAll()

            res.render('editCourse', {data, error, cat})
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
            const {id} = req.params

            if(error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
                let msg = error.errors.map(el => el.message)
                
                res.redirect(`/courses/${id}/edit?error=${msg}`)
            } else{
                res.send(error)
            }
        }
    }

    static async editProfile(req, res) {
        try {
            const {id} = req.params
            const {error} = req.query
            const {user} = req.session
            const data = (await Profile.findAll({
                where: {id},
                include: {
                    model: User
                }
            }))[0]
            
            
            res.render('editProfile', {data, error, user})
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditProfile(req, res) {
        try {
            const {id} = req.params
            await Profile.update(req.body, {
                where: {id}
            })

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    static async deleteCourse(req, res) {
        try {
            const {id} = req.params
            Course.deleteCourse(id)
            
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