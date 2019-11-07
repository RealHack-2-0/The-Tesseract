const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    passwd:{
        type:String,
        required:true
    },
    signuptime:{
        type:Date,
        required:true
    },
    photourl:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('user',userSchema);
