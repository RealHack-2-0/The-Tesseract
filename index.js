const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

const app = express();

// Setup loggers and data parsers
app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});