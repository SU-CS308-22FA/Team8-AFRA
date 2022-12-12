import Comment from "../models/commentModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc    Get logged in user comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find(); //{ user: req.user._id }
  res.json(comments);
});

// @route   GET /api/comments/SortedByLike
const getCommentsByLike = asyncHandler(async (req, res) => {
  const comments = await Comment.find().sort({ likes: 1 }); //{ user: req.user._id }
  res.json(comments);
});

// @route   GET /api/comments/SortedByLikeReverse
const getCommentsByLikeReverse = asyncHandler(async (req, res) => {
  const comments = await Comment.find().sort({ likes: -1 }); //{ user: req.user._id }
  res.json(comments);
});

// @route   GET /api/comments/SortedByDate
const getCommentsByDate = asyncHandler(async (req, res) => {
  const comments = await Comment.find().sort({ createdAt: -1 }); //{ user: req.user._id }
  res.json(comments);
});

const getCommentsBySearchWord = asyncHandler(async (req, res) => {
  const searchWord = req.params.word;
  console.log(searchWord);

  Comment.find({
    '$or': [
        { 'content': {'$regex': searchWord, '$options': 'i'} }, 
        { 'title': {'$regex': searchWord, '$options': 'i'}}
    ]}, function(err, docs){
      res.status(200).json(docs);
    })
});

const getCommentsBySearchUser = asyncHandler(async (req, res) => {
  const searchUser = req.params.username;
  console.log(searchUser);
  let the = [];
  let myBool = false;
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].username == searchUser) {
        myBool = true;
        the.push(data[i]);
      }
    }
    
    if (myBool === false){
      //send frontend "There is no such user!"
    }
    
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

const getFilteredComments = asyncHandler(async (req, res) => {
  const { filters } = req.body;
  console.log(filters);
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (filters.includes("journalist") && data[i].userrole === "journalist") {
        if (filters.includes("fiveLikes") && data[i].likes >= 5 && data[i].likes < 10) {
          console.log("journalist fiveLikes");
          the.push(data[i]);
        } 
        else if (filters.includes("tenLikes") && data[i].likes >= 10) {
          console.log("journalist ve tenLikes");
          the.push(data[i]);
        } 
        else if (!filters.includes("fiveLikes") && !filters.includes("tenLikes")){
          console.log("just journalist");
          the.push(data[i]);
        }
      } 
      else if (filters.includes("referee") && data[i].userrole === "referee") {
        if (filters.includes("fiveLikes") && data[i].likes >= 5 && data[i].likes < 10) {
          console.log("referee fiveLikes");
          the.push(data[i]);
        } 
        else if (filters.includes("tenLikes") && data[i].likes >= 10) {
          console.log("referee tenLikes");
          the.push(data[i]);
        } 
        else if (!filters.includes("fiveLikes") && !filters.includes("tenLikes")) {
          console.log("just referee");
          the.push(data[i]);
        } 
      } 
      else if (filters.includes("user") && data[i].userrole === "user") {
        if (filters.includes("fiveLikes") && data[i].likes >= 5 && data[i].likes < 10) {
          console.log("user fiveLikes");
          the.push(data[i]);
        } 
        else if (filters.includes("tenLikes") && data[i].likes >= 10) {
          console.log("user tenLikes");
          the.push(data[i]);
        } 
        else if (!filters.includes("fiveLikes") && !filters.includes("tenLikes")){
          console.log("just user");
          the.push(data[i]);
        } 
      } 
      else if ( !filters.includes("journalist") && !filters.includes("referee") && !filters.includes("user") && filters.includes("fiveLikes") && data[i].likes >= 5 && data[i].likes < 10) {
        console.log("just fiveLikes");
        the.push(data[i]);
      } 
      else if (!filters.includes("journalist") && !filters.includes("referee") && !filters.includes("user") && filters.includes("tenLikes") && data[i].likes >= 10) {
        console.log("just tenLikes");
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});


const getCommentsByReferee = asyncHandler(async (req, res) => {
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].userrole == "referee") {
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

const getCommentsByJournalist = asyncHandler(async (req, res) => {
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].userrole == "journalist") {
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

const getCommentsLikeFive = asyncHandler(async (req, res) => {
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].likes >= 5) {
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

const getCommentsLikeTen = asyncHandler(async (req, res) => {
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].likes >= 10) {
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

const getCommentsByUser = asyncHandler(async (req, res) => {
  let the = [];
  try {
    const data = await Comment.find();
    for (var i = 0; i < data.length; i++) {
      if (data[i].userrole == "user") {
        the.push(data[i]);
      }
    }
    res.status(200).json(the);
  } catch {
    res.status(400).send("ERROR");
  }
});

//@description     Fetch single Comment
//@route           GET /api/comments/:id
//@access          Public
const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ message: "Comment not found" });
  }

  res.json(comment);
});

//@description     Create single Comment
//@route           GET /api/comments/create
//@access          Private
const CreateComment = asyncHandler(async (req, res) => {
  const { title, content, username } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const comment = new Comment({
      user: req.user._id,
      userrole: req.user.role,
      title,
      content,
      username,
    });

    const createdComment = await comment.save();

    res.status(201).json(createdComment);
  }
});

//@description     Delete single Comment
//@route           GET /api/comments/:id
//@access          Private
const DeleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (comment) {
    await comment.remove();
    res.json({ message: "Comment Removed" });
  } else {
    res.status(404);
    throw new Error("Comment not Found");
  }
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
const UpdateComment = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (comment) {
    comment.title = title;
    comment.content = content;

    const updatedComment = await comment.save();
    res.json(updatedComment);
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

const LikeState = asyncHandler(async (req, res) => {
  const { title, content, likes, username } = req.body;

  const comment = await Comment.findById(req.params.id);
  console.log(comment.usersThatLikedTheComment);
  console.log(comment.usersThatLikedTheComment.includes(username));

  if (comment) {
    if (comment.usersThatLikedTheComment.includes(username) == false) {
      comment.usersThatLikedTheComment.push(username);
      comment.title = title;
      comment.content = content;
      comment.likes = likes + 1;
      const updatedComment = await comment.save();
      res.json(updatedComment);
    } else {
      comment.usersThatLikedTheComment.splice(
        comment.usersThatLikedTheComment.indexOf(username, 0),
        1
      );
      comment.title = title;
      comment.content = content;
      comment.likes = likes - 1;
      const updatedComment = await comment.save();
      res.json(updatedComment);
    }
  } else {
    res.status(404);
    throw new Error("Comment not found");
  }
});

export {
  getCommentById,
  getComments,
  CreateComment,
  DeleteComment,
  UpdateComment,
  LikeState,
  getCommentsByLike,
  getCommentsByDate,
  getCommentsByLikeReverse,
  getCommentsBySearchWord,
  getCommentsBySearchUser,
  getFilteredComments,
  getCommentsByReferee,
  getCommentsByJournalist,
  getCommentsByUser,
  getCommentsLikeFive,
  getCommentsLikeTen,
};
