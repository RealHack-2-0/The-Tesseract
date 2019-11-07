const mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    title: "",
    content: "",
    timestamp: "",
    owner: "",
    tags: "",
    viewcount: 0,
    isanswered: "",
    upvotecount: 0,
    downvotecount: 0,
    answers: answer,
});

module.exports = mongoose.model('questions', questionSchema);