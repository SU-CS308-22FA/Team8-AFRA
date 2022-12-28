import BugReport from "../models/bugReportModel.js";
import asyncHandler from "express-async-handler";

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
  const { id } = req.body;
  try {
    let deleting = await BugReport.deleteOne({ _id: id });
    res.status(200).send("Bug Report has been deleted");
  } catch {
    res.status(400).send("Failed to delete Bug Report.");
  }
});

const informReporter = asyncHandler(async (req, res) => {
  const { user } = req.body;
  try {
    const theuser = await User.findById(user);
    theuser.banned = false;
    await theuser.save();
    const b = await Blacklist.deleteOne({ user: user });
    const f = await Appeal.deleteOne({ user: user });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });
    const text =
      "Hello, " +
      theuser.name +
      "\n \t Your explaination for the appeal was found as valid by the admins! You have been unbanned, welcome back to AFRA";

    var mailOptions = {
      from: process.env.MAIL,
      to: theuser.email,
      subject: "APPEAL ACCEPTED",
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).send("User has been unbanned!");
  } catch (err) {
    res.status(400).send(err);
  }
});

export { getAllBugReports, addBugReport, deleteBugReport };
