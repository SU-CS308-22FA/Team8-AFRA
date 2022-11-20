import mongoose from "mongoose";

const proRequestSchema = new mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
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
