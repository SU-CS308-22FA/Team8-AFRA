import mongoose from "mongoose";

const proRequestSchema = new mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
    },
    name:{
        type:String,
        required: true
    },
    licence:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
})

const proRequest = mongoose.model("proRequest", proRequestSchema);

export default proRequest;
