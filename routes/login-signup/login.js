const express = require('express')
const passport = require('passport')
const router = express.Router()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//const User = require('../../models/User')


/**
 * Login endpoint.
 *
 * Verify given user credentials and provide JWT token.
 *
 * @body User credentials (username and password)
 * @response JWT token
 */
router.post('/login', (req, res, next) => {
    User.findOne({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user == null || user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        id: user._id // Use userid and email for the token
                    }, 'secret', {
                        expiresIn: '24h'
                    })
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token,
                        user: user,
                        user_id: user._id
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router