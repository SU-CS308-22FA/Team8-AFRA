import mongoose from "mongoose";

const faqSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required:true,
    },
    answer: { 
      type: String, 
      required:true
    }
  }
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
