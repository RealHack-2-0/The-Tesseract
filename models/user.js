const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id: "",
    username: "",
    passwd: "",
    signuptime: "",
    photourl: "",
});

module.exports = mongoose.model('users', userSchema);