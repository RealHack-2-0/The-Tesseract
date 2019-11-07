const mongoose = require('mongoose');

var answerSchema = new mongoose.Schema({
    content: "",
    timestamp: "",
    owner: "",
    upvotecount: "",
    downvotecount: "",
});

module.exports = mongoose.model('answer', answerSchema);