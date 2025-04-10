const session = require('express-session')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    secret: 'hanya saya yang tahu',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
     }
}))
app.use('/', require("./routers"))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})