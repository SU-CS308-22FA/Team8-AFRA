import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Report from "../models/reportModel.js";
import Blacklist from "../models/blacklist.js";
import nodemailer from 'nodemailer'

const getReports = asyncHandler(async (req, res) => {
  let the = []; 
  try{
    const data = await Report.find({});
    for(var i=0; i< data.length; i++){
        const commentContent = await Comment.findById(data[i].comment)
        const username = await User.findById(data[i].user)
        const reportedByusername = await User.findById(data[i].reportedBy)

        const userEmail = username.email || "deleted user";
        const comment = commentContent.content || "deleted comment";
        const reported = reportedByusername.username || "deleted user";

        if(reportedByusername &&  username)
        {
          var item = {
            user: data[i].user,
            comment: data[i].comment,
            reportedBy: data[i].reportedBy,
            date: data[i].date,
            commentContent: comment,
            userEmail: userEmail,
            reportedByusername: reported,
            cause: data[i].cause,
            _id: data[i]._id
          }
          the.push(item);
        }
        else  //reported or the reporter no longer have an account
        {
          const theReport = await Report.deleteOne({_id: data[i]._id})
        }
    }
  res.status(200).json(the);
  }
  catch{
    res.status(400).send("ERROR");
  }
});


const banUser = asyncHandler(async (req, res) => {
    const { user, comment, report, cause } = req.body;

   try{
    console.log(process.env)
    const theuser = await User.findById(user);
    theuser.banned = true;
    const yes = await theuser.save();
    let black = new Blacklist({ user: theuser._id, cause: cause, email: theuser.email})
    black.save()
    //send an email to the user to notify he is banned 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS
      }
    });
    const text = "Hello, " + theuser.name + "\n \t I'm here to notify you that you have been banned from AFRA for the following reason: " + cause;

    var mailOptions = {
      from: process.env.MAIL,
      to: theuser.email,
      subject: 'You have been banned',
      text: text
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    if(comment !== "deleted comment")
    {
      const thecomment = await Comment.deleteOne({_id: comment});
    }
    const theReport = await Report.deleteOne({_id: report})
    const theReport2 = await Report.deleteMany({user: user}); //delete all the reports corresponding to that user
    res.status(200).send("DONE")
   }
   catch{
    res.status(400).send("NOPE")
   }
});

const falseReport = asyncHandler(async (req, res) => {
    const { reportedBy, report} = req.body;
    try{
        const theuser = await User.findById(reportedBy);
        theuser.falseReports = theuser.falseReports + 1;
        if(theuser.falseReports == 4){
          theuser.banned = true;
          let black = new Blacklist({ user: theuser._id, cause: "False reporting more then 3 times", email: theuser.email})
          black.save()
        }    
        const yes = await theuser.save();
        const theReport = await Report.deleteOne({_id: report})
        res.status(200).send("DONE")
       }
       catch{
        res.status(400).send("NOPE")
       }
});

export { banUser, getReports, falseReport};
