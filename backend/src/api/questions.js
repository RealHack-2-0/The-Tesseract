const express = require('express')
const router = express.Router()
const verify = require('../auth/verify')
const Question = require('../model/Question')
const Answer = require('../model/Answer')
const mongoose = require('mongoose')


router.get('/', function (req, res) {
    Question.find({
        qid: new mongoose.Types.ObjectId(req.qid)
    }).exec((err, question) => {
        if (err || question == null) {
            return res.status(500).send({
                message: 'Error retrieving Question with id: ' + req.uid
            })
        }

        res.status(200).send(question)
    })
})


router.get('/:id', [verify.decodeToken], function (req, res) {
    Car.findById(req.params['id']).exec((err, car) => {
        if (err || car == null) {
            return res.status(500).send({
                message: 'Error retrieving Car with id: ' + req.params['id']
            })
        }

        if (car.ownerId.toString() !== req.uid.toString()) {
            return res.status(400).send({
                message: 'Unauthorized for the resource'
            })
        }

        res.status(200).send(car)
    })
})


router.post('/new', function (req, res) {
    console.log(req.body.content)
    if (!!req.body.title && !!req.body.content) {
        const question = new Question({
            title: req.body.title,
            content: req.body.content,
            tags: req.body.tags,
            viewCount: req.body.viewCount,
            owner: req.body.owner,
            isAnswered: req.body.isAnswered,
            upVoteCount: req.body.upVoteCount,
            downVoteCount: req.body.downVoteCount,
        })
        question.save().then(() => {
            res.status(200).send({
                message: 'Success, Question created!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Question creation error.'
            })
        })
    } else {
        res.status(400).send({
            message: 'Missing fields'
        })
    }
})

router.put('/:upvote', function (req, res) {
    Question.findById(req.params['upvote']).exec((err, question) => {
        if (err || question == null) {
            return res.status(500).send({
                message: 'Error updating Question with id: ' + req.params['upvote']
            })
        }

        if (req.body.upVoteCount) {
            question.upVoteCount = question.upVoteCount + 1
        }

        if (req.body.downVoteCount) {
            question.downVoteCount = question.downVoteCount + 1
        }
        question.save().then(() => {
            res.status(200).send({
                message: 'Success, Question updated!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Question update error.'
            })
        })
    })
})

// Add answer
router.post('/answer', function (req, res) {
    if (!!req.body.title && !!req.body.content) {
        const answer = new Answer({
            content: req.body.content,
            viewCount: req.body.viewCount,
            owner: req.body.owner,
            upVoteCount: req.body.upVoteCount,
            downVoteCount: req.body.downVoteCount,
        })
        question.save().then(() => {
            res.status(200).send({
                message: 'Success, Question created!'
            })
        }).catch(() => {
            res.status(500).send({
                message: 'Question creation error.'
            })
        })
    } else {
        res.status(400).send({
            message: 'Missing fields'
        })
    }
})

router.put('/answer', (req, res, next) => {
    User.findById(
            req.body.uid
        )
        .then((user) => {
            const answer = new Answer({
                content: req.body.content,
                viewCount: req.body.viewCount,
                owner: req.body.owner,
                upVoteCount: req.body.upVoteCount,
                downVoteCount: req.body.downVoteCount,
            })
            return user.updateOne({
                $addToSet: {
                    answers: answer
                }
            }).then(() => {
                res.status(200).send({
                    message: 'Answer added'
                })
            })
        }).catch(() => {
            res.status(500).send({
                message: 'User adding error.'
            })
        })
})

module.exports = router