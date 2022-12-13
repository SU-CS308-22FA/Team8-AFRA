import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Blacklist from "../models/blacklist.js";
import proRequest from "../models/requestModel.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../models/UserOTPVerificationModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
 //const {v4: uuidv4}=require("uuid");
 dotenv.config();
//@description     Auth the user
//@route           POST /api/users/login
//@access          Public

//nodemailer stuff
const transporter= nodemailer.createTransport({
  service:"gmail",
  //host:"smtp-mail.outlook.com",
  auth:{
    user: process.env.MAIL,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((error,success)=>{
  if(error){
    console.log(error);
  }else{
    console.log("Ready for messages");
    console.log(success);
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const banned = await Blacklist.findOne({ user: user });
  if(banned) 
  {
    res.status(404);
    throw new Error("The user with this email has been banned for: " + banned.cause);
  }
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
      role: user.role,
      verified: user.verified,
      licence: user.licence,
      banned: user.banned,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username, pic } = req.body;

  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (userExists) {
    const banned = await Blacklist.findOne({ user: userExists });
    if(banned) 
    {
      res.status(404);
      throw new Error("The user with this email has been banned for: " + banned.cause);
    }
    res.status(404);
    throw new Error("Email is already used");
  } 
  else if(usernameExists){
    res.status(404);
    throw new Error("Username is already used");
  }

  const user = await User.create({
    name: name,
    email: email,
    username: username,
    password: password,
    pic: pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
      role: user.role,
      verified: user.verified,
      licence: user.licence,
      banned: user.banned,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// @desc    GET user profile
// @route   GET /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.email) //if user changes email the verification drops.
    {
    user.verified = false;
    }
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.pic = req.body.pic || user.pic;
    user.refresh_token = req.body.refresh_token || user.refresh_token
    user.verified= req.body.verified || user.verified;
    if (req.body.licence)
    {
      user.verified = false;
      user.role = "user";
      user.licence = "https://drive.google.com/file/d/" + req.body.licence;
      const requestExists = await proRequest.findOne({ user: user._id });
      if (requestExists) {
        proRequest.updateOne({ user: user._id }, { licence: user.licence, name: user.name }, function (err, docs) {
            if (err) {
              console.log(err);
            } 
            else {
              console.log("Updated Docs : ", docs);
            }
        });
      } 
      else {
        let request = new proRequest({ user: user._id, licence: user.licence, name: user.name,
        });
        request.save();
      }
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      pic: user.pic,
      role: user.role,
      verified: user.verified,
      licence: user.licence,
      token: generateToken(user._id),
      banned: user.banned,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({ _id: req.user._id });
  const request = await proRequest.deleteOne({ user: req.user._id });

  if (user) {
    res.json("User deleted");
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const checkBanned = asyncHandler(async (req, res) => {
  const { user } = req.query;

  const banned = await Blacklist.findOne({ user: user });

  if (banned) {
    res.status(200).send("banned");
  } else {
    res.status(200).send("not banned");
  }
});

const sendOTPVerificationEmail =asyncHandler (async (req,res) => { 

  const _id= req.body._id;
  const email=req.body.email;


  try{
    const otp = `${Math.floor(1000+ Math.random()*9000)}`;

    //const currentUrl="process.env.REACT_APP_URL";
    //mail options
    const MailOptions={
      from: process.env.MAIL,
      to: email,
      subject:"Verfiy your email",
      html:`<p> Enter <b> ${otp}</b> in the app to verify your email address </p><p> This code expires in 1 hour </p>
      `,
    };

    //hash the otp
    const saltRounds=10;
    const hashedOTP = await bcrypt.hash(otp,saltRounds).then().catch(()=>{
      res.json({
        status: "FAILED",
        message:"An error happen while hashing email data",
      })
    });
    await UserOTPVerification.deleteMany({userId: _id});
    const newOTPVerification = await new UserOTPVerification({
      userId:_id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now()+3600000, 
    });
    //save otp record
    await newOTPVerification.save();
    //console.log(UserOTPVerification);
    transporter.sendMail(MailOptions);
    res.json({
      status:"PENDING",
      message: "Verification otp email send",
      data:{
        userId:_id,
        email,      
      },
    });

  }catch(error){
    res.json({
      status:"FAILED",
      message: error.message,
    });
  }

});

// @route   POST /api/users/verifyotp
const VerifyOTP =asyncHandler (async (req,res) => { 
  try{
    console.log("request is");
    console.log(req.body);
    const userId = req.body.userId;
    const otp = req.body.otp;


    if(!userId || !otp){
      throw Error("Empty otp details are not allowed");
    }else{
      const UserOTPVerificationRecords= await UserOTPVerification.find({
        userId,
      });
      //console.log("UserOTPVerificationRecors is");
      //console.log(UserOTPVerificationRecords);
      if(UserOTPVerificationRecords.length<=0){
        //console.log("no record found");
        //no record found
        throw new Error("Account record does not exists or has been verified already");
      }else{
        //console.log("user otp record exists");
        //user otp record exists
        const {expiresAt}=UserOTPVerificationRecords[0];
        const hashedOTP=UserOTPVerificationRecords[0].otp;

        if(expiresAt<Date.now()){
          //console.log("user otp record expired")
          //user otp record expired
          await UserOTPVerification.deleteMany({userId:userId});
          throw new Error("Code has expired. Please request again");
        }else{
          //console.log("checking for validation");
          //console.log(hashedOTP);
          //console.log(otp);
          const validOTP = await bcrypt.compare(otp,hashedOTP);
          if(!validOTP){
            console.log("not valid");
            //supplied otp is wrong
            throw new Error("Invalid code passed. Check your inbox again");
          }else{
            console.log("valid");
            //success
            const userUpOne = await User.findById(userId);
            userUpOne.verified=true;
            await userUpOne.save();
           // console.log("User.updateOne");
            //console.log(userUpOne);
            //const printUser = await UserOTPVerification.deleteMany({userId: userId});
            //console.log("UserOTPVerification")
            //console.log(printUser);

            res.send(
              "VERIFIED"
            );
            /*
            res.json({
              status:"VERIFIED",
              message:"User email verified successfully",
            });
            */
          }
        }
      }
    }
  }catch(error){
    res.status(400).send(
      "error"
    );
  }

});

/* 
// @route     GET /api/users/report
// @params    Gets a user, comment, the user who reports and the report cause to save it to the database
// @desc      First checks the user if banned before: if banned before returns an appropriate message, else;
saves the report to the database.
// @response  Send a json array consisting of the comments that are prepared according to filters
*/
const reportUser = asyncHandler(async (req, res) => {
  const { user, comment, reportedBy, cause } = req.body;
  console.log("I AM HEREEEEEE")
  try {
    console.log("I AM HEREEEEEE")
    const theuser = await User.findById(user);
    if (theuser.banned === true) res.status(200).send("User is already banned");
    else {
      let report = new Report({
        user: user,
        comment: comment,
        cause: cause,
        reportedBy: reportedBy,
      });
      report.save();
      res.status(200).send("Your report is sent to the admins. Thank you !");
    }
  } catch {
    res.status(400).send("NOPE");
  }
});
export { authUser, updateUserProfile, registerUser, deleteUserProfile,sendOTPVerificationEmail,VerifyOTP, checkBanned, reportUser};