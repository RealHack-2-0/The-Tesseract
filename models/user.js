const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    method: {
        type: String,
        //more methods will add
        enum: ['google', 'local'],
        required: true
    },
    local: {
        email:{
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
        },
    },
    google: {
        email:{
            type:String,
            required:true
        },
        username:{
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
    }
});

module.exports = mongoose.model('user',userSchema);
