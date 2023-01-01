import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Appeal from "../models/appealModel.js";
import Blacklist from "../models/blacklist.js";
import nodemailer from 'nodemailer'

const getAppeal = asyncHandler(async (req, res) => {
    try{
      const data = await Appeal.find({});
      res.status(200).json(data);
    }
    catch{
      res.status(400).send("ERROR");
    }
  });
//input user email and his explaination
const sendAppeal = asyncHandler(async (req, res) => {
  const { email, explaination} = req.body;
  try{
    const a = await Appeal.findOne({email: email})
    if (a){
      res.status(200).send("You have already made an appeal request!")
    }
    else{
      const blacklist = await Blacklist.findOne({email: email});
      if(blacklist){
        const appeal = new Appeal ({
          user: blacklist.user,
          email: blacklist.email,
          cause: blacklist.cause,
          explaination: explaination
      })
      appeal.save();
      res.status(200).send("Succesfully sent the appeal to the admins!")
      }
      else
      res.status(200).send("You are not banned stop wasting our time!")
    }
  }
  catch(err){
    console.log(err);
    res.status(400).send(err)
  }
});

//admins will do these, send an email to the user we dont like your reason sth
const denyAppeal = asyncHandler(async (req, res) => {
    const {explaination, user}=req.body;
   try{
    const theuser = await User.findById(user);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL,
          pass: process.env.MAIL_PASS
        }
      });
      const text = "Hello, " + theuser.name + "\n \t Your explaination: " + explaination + "\n Was not found to be valid. We kindly ask you to check our community guidelines again.";
  
      var mailOptions = {
        from: process.env.MAIL,
        to: theuser.email,
        subject: 'APPEAL DENIED',
        text: text
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).send("The appeal has been denied, an email is delivered to the user.")
      const f = await Appeal.deleteOne({user: theuser._id})
   }
   catch(err){
    console.log(err)
    res.status(400).send(err);
   }
});

const acceptAppeal = asyncHandler(async (req, res) => {
    const {user} = req.body;
    try{
        const theuser = await User.findById(user);
        theuser.banned = false;
        await theuser.save();
        const b = await Blacklist.deleteOne({user: user})
        const f = await Appeal.deleteOne({user: user})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.MAIL,
              pass: process.env.MAIL_PASS
            }
          });
          const text = "Hello, " + theuser.name + "\n \t Your explaination for the appeal was found as valid by the admins! You have been unbanned, welcome back to AFRA";
      
          var mailOptions = {
            from: process.env.MAIL,
            to: theuser.email,
            subject: 'APPEAL ACCEPTED',
            text: text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.status(200).send("User has been unbanned!")
       }
       catch(err){
        res.status(400).send(err)
       }
});

const listBanned = asyncHandler(async (req, res) => {
  try{
      const black = await Blacklist.find({})
      res.status(200).json(black)
     }
     catch(err){
      res.status(400).send(err)
     }
});

const manualUnban = asyncHandler(async (req, res) => {
  const {user} = req.body;
  try{
      const theuser = await User.findById(user);
      theuser.banned = false;
      await theuser.save();
      const b = await Blacklist.deleteOne({user: user})
      const f = await Appeal.deleteMany({user: user})
      res.status(200).send("User unbanned!")
     }
     catch(err){
      res.status(400).send(err)
     }
});

export { getAppeal, sendAppeal, denyAppeal, acceptAppeal, listBanned, manualUnban};
