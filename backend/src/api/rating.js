const express = require('express')
const router = express.Router()
const Rate = require('../model/Rate')
const verify = require('../auth/verify')

/**
 * Rating post endpoint.
 *
 * Create a rating.
 *
 * 
 * 
 */
router.post('/', [verify.decodeToken], function (req, res) {
    if (req.body.rate) {
        const rating = new Rate({
            rate: req.body.rate,
            comment: req.body.comment
        })
        rating.save().then(() => {
            res.status(200).send({
                message: 'Success, rate created!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Rate creation error.'
            })
        })
    } else {
        res.status(400).send({
            message: 'Missing Fields'
        })
    }
})

/**
 * Rating get endpoint.
 *
 * Get a rating.
 *
 * 
 * 
 */

router.get('/all', [verify.decodeToken], function (_, res) {
    Rate.find().exec((err, ratings) => {
        if (err || ratings == null) {
            return res.status(500).send({
                message: 'Error retrieving ratings'
            })
        }
        res.status(200).send(ratings)
    })
})

module.exports = router