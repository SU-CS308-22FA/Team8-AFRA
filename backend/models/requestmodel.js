const mongoose = require('mongoose');

const proRequestSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    licence:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('proRequest', proRequestSchema);