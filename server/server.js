require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const process = require('process')

const app = express()

mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("Connected to DB"))
    .catch(err=>console.log(`Error while connecting to db: ${err.message}`))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.json({data: 'success'})
})

const port = process.env.SERVER_PORT || 8000

app.listen(port, ()=>console.log(`Server is running on: ${port}`))