const admin = require('../firebase')
const User=  require('../models/user')

exports.authCheck = (req, res, next) => {
    console.log(req.headers)
    admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then(user=>{
            console.log('fb user:',user)
            req.user = user
            next()
        })
        .catch(err=>{
            res.status(401).json({
                err: err.message,
                msg: "Invalid or expired token"
            })
        })
}

exports.adminCheck = (req, res, next) => {
    const {email} = req.user
    User.findOne({email}).exec()
        .then(user=>{
            if (user.role!=='admin') {
                res.status(403).json({
                    err: "Admin resource. Access denied."
                })
            } else {
                next()
            }
        })
}