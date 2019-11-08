const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()

const config = require('../app.config')
const indexRouter = require('./api/index')
const authRouter = require('./api/auth')
const usersRouter = require('./api/users')
const carsRouter = require('./api/cars')
const servicesRouter = require('./api/services')
const reservationsRouter = require('./api/reservations')
const ratingRouter = require('./api/rating')
const questionRouter = require('./api/questions')


// Initialize the express app
var app = express()

// Setup logger and data parsers
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

// Initialize mongoose and connect to the MongoDB database
mongoose.Promise = global.Promise
mongoose.connect(config.DB, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  }).catch(err => {
    console.log('Could not connect to MongoDB.')
    console.log(err)
    process.exit()
  })

// Setup routes for the API endpoints.
app.use(indexRouter)
app.use('/auth', authRouter)
app.use('/users', usersRouter)
app.use('/cars', carsRouter)
app.use('/services', servicesRouter)
app.use('/reservations', reservationsRouter)
app.use('/rating', ratingRouter)
app.use('/question', questionRouter)

// Set the port to 3000
app.set('port', process.env.PORT || 3000)
module.exports = app