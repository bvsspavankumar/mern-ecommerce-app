const express = require('express')

const {createOrUpdateUser, currentUser} = require('../controllers/auth')
const {authCheck} = require('../middlewares/auth')
const router = express.Router()

router.get('/', authCheck, (req, res)=>{
    res.json({
        data: 'api root'
    })
})

router.post('/create-or-update-user', authCheck, createOrUpdateUser)
router.post('/current-user', authCheck, currentUser)
module.exports = router