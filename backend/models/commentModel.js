import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: false,
    },
    userrole: {
      type: String,
      unique: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    usersThatLikedTheComment: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    matchID: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
