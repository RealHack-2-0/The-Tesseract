var express = require('express');
var router = express.Router();
const passport = require('passport');

var authRouter = require('./auth');
var paperRouter = require('./questions');
var userRouter = require('./users');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


const passportJWT = passport.authenticate('jwt', { session: false });


router.use('/auth',authRouter);
router.use('/questions',passportJWT,paperRouter);
router.use('/users',passportJWT,userRouter);

module.exports = router;
