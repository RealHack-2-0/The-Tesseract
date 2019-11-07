const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
//require('../dotenv').config()
const db = "mongodb+srv://mihiru:mihiru@cluster0-wrg1h.mongodb.net/test?retryWrites=true&w=majority"

// Connect to mongodb server
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to database')
    }
})
module.exports = router