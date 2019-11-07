const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    title:{
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
    tags:{
        type:Array,
        required:true,
    },
    viewcount:{
        type:Number,
        required:true,
    },
    isanswered:{
        type:Boolean,
        required:true,
    },
    upvotecount:{
        type:Number,
        required:true,
    },
    downvotecount:{
        type:Number,
        required:true,
    },
    answers:{
        type:Array,
        required:true,
    }
});

module.exports = mongoose.model('question',questionSchema);
