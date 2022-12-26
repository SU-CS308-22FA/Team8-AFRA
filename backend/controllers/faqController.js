import asyncHandler from "express-async-handler";
import Faq from "../models/faqModel.js";

const getFaq = asyncHandler(async (req, res) => {
    try {
      const data = await Faq.find({});
      res.status(200).json(data);
    } catch (err){
      res.status(400).send(err);
    }
  });

  const addFaq = asyncHandler(async (req, res) => {
    const { question, answer} = req.body;
    try{
      let not = await new Faq({ question: question, answer: answer})
      await not.save();
      res.status(200).send("FAQ is added!")
   }
   catch{
    res.status(400).send("Failed to add FAQ.")
   }
  });
  
  const deleteFaq = asyncHandler(async (req, res) => {
    const {id} = req.body;
    try{
      let not = await Faq.deleteOne({_id: id})
      res.status(200).send("FAQ has been deleted")
   }
   catch{
    res.status(400).send("Failed to delete FAQ.")
   }
  });

  export { addFaq, deleteFaq, getFaq};
