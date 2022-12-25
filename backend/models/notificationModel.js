import mongoose from "mongoose";

const notificationSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required:true,
    },
    text: { 
      type: String, 
      required:true
    },
    catagory: { 
      type: String, 
      required:true
    },
    users: {
      type: Array,
      default: [],
    },
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
