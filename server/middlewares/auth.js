const admin = require('../firebase')

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