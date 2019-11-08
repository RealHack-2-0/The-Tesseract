const mongoose = require('mongoose')

/**
 * Data model for Rating.
 */
const ratingSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        createIndex: true,
        required: true,
        auto: true
    },
    rate: Number,
    comment: String,
    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

module.exports = mongoose.model('Rating', ratingSchema)