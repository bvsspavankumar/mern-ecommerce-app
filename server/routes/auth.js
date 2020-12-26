const express = require('express')

const {createOrUpdateUser} = require('../controllers/auth')
const {authCheck} = require('../middlewares/auth')
const router = express.Router()

router.get('/', authCheck, (req, res)=>{
    res.json({
        data: 'api root'
    })
})

router.post('/create-or-update-user', authCheck, createOrUpdateUser)

module.exports = router