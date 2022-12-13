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
    usersThatReplyTheComment:{
      type: Array,
      default:[],
    },
    depth: {
      type: Number,
      default: 1
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
