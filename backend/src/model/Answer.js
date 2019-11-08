const mongoose = require('mongoose')

/**
 * Data model for Question.
 */
const questionSchema = mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    content: String,
    viewCount: Number,
    owner: String,
    upVoteCount: Number,
    downVoteCount: Number,
})

module.exports = mongoose.model('Question', questionSchema)