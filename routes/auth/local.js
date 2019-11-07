const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('./../../models/user');
const {validateBody, schemas} = require('./../../helpers/helper');

const passportSignIn = passport.authenticate('local', {session: false});

router.route('/signup').post(validateBody(schemas.authSignUpSchema), async (req, res, next) => {
    const {email, username, passwd, signuptime, photourl} = req.body;

    // Check if there is a user with the same email
    const foundEmail = await User.findOne({"local.email": email});
    const foundUsername = await User.findOne({"local.username": username});
    if (foundEmail || foundUsername) {
        return res.status(403).json({error: 'Email or username is already in use'});
    }

    // Create a new user
    const newUser = new User({
        method: 'local',
        local: {
            email,
            username,
            passwd,
            signuptime,
            photourl,
        }
    });

    await newUser.save();

    // Generate the token
    var token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET_KEY);
    // Respond with token
    res.status(200).json({token});
});

router.route('/signin')
    .post(validateBody(schemas.authSignInSchema), passportSignIn, async (req, res, next) => {
        // Generate token
        const token = jwt.sign({id: req.user.id}, process.env.JWT_SECRET_KEY);
        res.status(200).json({token});
    });

module.exports = router;