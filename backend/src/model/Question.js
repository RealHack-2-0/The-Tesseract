const mongoose = require('mongoose')

/**
 * Data model for Question.
 */
const questionSchema = mongoose.Schema({
    qid: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    title: String,
    content: String,
    tags: [],
    viewCount: Number,
    owner: String,
    isAnswered: Boolean,
    upVoteCount: Number,
    downVoteCount: Number,
    answers: []
})

module.exports = mongoose.model('Question', questionSchema)