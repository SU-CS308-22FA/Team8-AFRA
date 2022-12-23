import mongoose from "mongoose";

const appealSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required:true,
      unique: false,
    },
    explaination: { 
      type: String, 
      required:true
    },
    cause: { 
        type: String, 
        required:true
      },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date:{
        type:Date,
        default: Date.now
    }
  }
);

const Appeal = mongoose.model("Appeal", appealSchema);

export default Appeal;
