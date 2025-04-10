const login = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login?error=Please login first!');
    }
    
    next()
}

const seller = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login?error=Please login first!');
    }
    
    if (req.session.user.role !== "seller") {
        return res.redirect('/?error=Only Seller can Access this!');
    }

    next()
}


module.exports = {login, seller}