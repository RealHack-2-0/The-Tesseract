const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

//require('../dotenv').config()
const db = "mongodb+srv://mihiru:mihiru@cluster0-2vea0.mongodb.net/test?retryWrites=true&w=majority"

// Connect to mongodb server
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to database')
    }
})
module.exports = router