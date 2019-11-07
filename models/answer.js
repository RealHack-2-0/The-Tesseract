const mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    upvotecount:{
        type:Number,
        required:true
    },
    downvotecount:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model('answer', answerSchema);