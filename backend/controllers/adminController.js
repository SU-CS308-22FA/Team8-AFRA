import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";
import Report from "../models/reportModel.js";
import Blacklist from "../models/blacklist.js";
import Maillist from "../models/mailList.js";
import nodemailer from 'nodemailer'


/* 
// @route   GET /api/admin
// @desc    Get all the reports from the database, if comment content is deleted set it as "deleted comment"
            If either the reported or the reporter user no longer exists, the request gets deleted
// @response  send a json array consisting of:
   the user_id, useremail, comment_id, comment content, 
   who it was reported by and their _id, date of report, cause of report
*/
const getReports = asyncHandler(async (req, res) => {
  let the = []; 
  try{
    const data = await Report.find({});
    for(var i=0; i< data.length; i++){
        const commentContent = await Comment.findById(data[i].comment)
        const username = await User.findById(data[i].user)
        const reportedByusername = await User.findById(data[i].reportedBy)

        const userEmail = username || "deleted user";
        var comment;
        if (!commentContent)
        {
          comment = "deleted comment";
        }
        else{
          comment = commentContent.content
        }
        const reported = reportedByusername || "deleted user";


        if(reportedByusername &&  username)
        {
          var item = {
            user: data[i].user,
            comment: data[i].comment,
            reportedBy: data[i].reportedBy,
            date: data[i].date,
            commentContent: comment,
            userEmail: userEmail.email,
            reportedByusername: reported.username,
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

/* 
// @route   POST /api/admin/ban
// @request Gets the user id to be banned, comment id, report id and the cause of report
// @desc    Sets the user as banned and adds the user to the blacklist, sends an email to the user
            with the description of the ban cause,   deletes the related comment, deletes all the reports made for that user
// @response  sends a message if succesfull -> DONE, else NOPE
*/
const banUser = asyncHandler(async (req, res) => {
    const { user, comment, report, cause } = req.body;

   try{
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

/* 
// @route   POST /api/admin/false-report
// @request Gets the id of whoever made the report, and the report id
// @desc    Finds the user and increments his false report count, if the user made more than 3 false
            reports, the user is added to the blacklist with the cause: false reporting, and gets set as banned.
            After that the related report gets deleted.
// @response  sends a message if succesfull -> DONE, else NOPE
*/
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

const mailSend = asyncHandler(async (req, res) => {
  const { topic, text} = req.body;
  try{
    const recipents = await Maillist.find({}, 'email')
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS
      }
    });

  var mailOptions = {
    from: process.env.MAIL,
    to: recipents,
    subject: topic,
    text: text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.status(200).send("Emails succesfully sent!")
 }
 catch{
  res.status(400).send("Failed to send emails...")
 }
});


export { banUser, getReports, falseReport, mailSend};
