const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    pro:{
        type: Boolean,
        required: true
    },
    accepted:{
        type: Boolean,
        required: true
    },
    licence:{
        type:String,
        required: false
    }
})

module.exports = mongoose.model('User', signUpSchema);