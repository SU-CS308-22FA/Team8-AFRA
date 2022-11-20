import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import proRequest from "../models/requestModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

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
    if (req.body.licence)
    {
      user.licence = "https://drive.google.com/file/d/" + req.body.licence
      let request = new proRequest({ user: user._id, licence: user.licence})
      request.save()
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
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.deleteOne({_id: req.user._id});

  if (user) {
    res.json(
     "User deleted"
    );
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});


export { authUser, updateUserProfile, registerUser, deleteUserProfile };
