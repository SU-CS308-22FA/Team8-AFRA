import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import proRequest from "../models/requestModel.js";
import generateToken from "../utils/generateToken.js";


//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username, pic } = req.body;

  const userExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (userExists) {
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
    if(req.body.email) //if user changes email the verification drops.
    {
      user.verified = false;
    }
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.pic = req.body.pic || user.pic;
    user.refresh_token = req.body.refresh_token || user.refresh_token
    if (req.body.licence)
    {
      user.verified = false;
      user.role = "user";
      user.licence = "https://drive.google.com/file/d/" + req.body.licence
      const requestExists = await proRequest.findOne({ user: user._id });
      if (requestExists){
        proRequest.updateOne({ user: user._id }, {licence: user.licence, name: user.name}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("Updated Docs : ", docs);
          }
      });
      }
      else{
        let request = new proRequest({ user: user._id, licence: user.licence, name: user.name})
        request.save()
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
      refresh_token: user.refresh_token,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

