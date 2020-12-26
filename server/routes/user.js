const express = require('express')

const router = express.Router()

router.get('/asdf', (req, res)=>{
    res.json({
        data: 'CRUD test api'
    })
})

module.exports = router