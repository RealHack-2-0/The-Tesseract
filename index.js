const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express();

const mongoose = require('mongoose')

const db = "mongodb+srv://mihiru:mihiru@cluster0-2vea0.mongodb.net/test?retryWrites=true&w=majority"

// Connect to mongodb server
mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('connected to database')
    }
})

// Setup loggers and data parsers
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

// Setup router to the endpoints
const loginRoutes = require('./routes/login-signup/login')
app.use('/login', loginRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});