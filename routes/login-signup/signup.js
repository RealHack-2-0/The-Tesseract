const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../models/User')

/**
 * Sign up end point.
 *
 * Sign up the given user.
 *
 * @body User data model exept id.
 */
router.post('/signup', (req, res, next) => {
    User.find({
        $or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]
    }).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email or username already exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(result => {
                            res.status(201).json({
                                message: 'User created'
                            })
                            console.log(user)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        })
                }
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500), json({
            error: err
        })
    })
})

module.exports = router