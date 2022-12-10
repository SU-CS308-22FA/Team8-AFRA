import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    date:{
        type:Date,
        default: Date.now
    },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Comment"
    },
    cause:{
        type:String,
        required:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
})

const report = mongoose.model("Report", ReportSchema);

export default report;
