import BugReport from "../models/bugReportModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
//const {v4: uuidv4}=require("uuid");
dotenv.config();

// @route GET /api/bugreports
const getAllBugReports = asyncHandler(async (req, res) => {
  const bugs = await BugReport.find().sort({ date: -1 });
  res.json(bugs);
});

const addBugReport = asyncHandler(async (req, res) => {
  const { bugPage, bugDetail, bugReportedUserEmail } = req.body;
  try {
    let report = await new BugReport({
      bugPage: bugPage,
      bugDetail: bugDetail,
      bugReportedUserEmail: bugReportedUserEmail,
    });
    await report.save();
    res.status(200).send("Bug Report is added!");
  } catch {
    res.status(400).send("Failed to add Bug Report.");
  }
});

const deleteBugReport = asyncHandler(async (req, res) => {
  const { id, bugReportedUserEmail } = req.body;
  try {
    const thepage = await BugReport.findOne({ _id: id });
    let deleting = await BugReport.deleteOne({ _id: id });
    const theuser = await User.findOne({ email: bugReportedUserEmail });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Ready for messages");
        console.log(success);
      }
    });

    const text =
      "Hello, " +
      theuser.name +
      "\n \t Your bug report has been considered by our software engineers. " +
      thepage.bugPage +
      " was reviewed. Problem is solved! Thank you for your cooperation. Enjoy AFRA :)";

    var mailOptions = {
      from: process.env.MAIL,
      to: theuser.email,
      subject: "BUG SOLVED",
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).send("Bug Report has been deleted");
  } catch {
    res.status(400).send("Failed to delete Bug Report.");
  }
});

export { getAllBugReports, addBugReport, deleteBugReport };
