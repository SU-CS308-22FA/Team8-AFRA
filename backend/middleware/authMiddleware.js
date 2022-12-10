import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Blacklist from "../models/blacklist.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      const banned = await Blacklist.findOne({user: decoded.id})
      if(banned)
      {
        throw "You have been banned!!!"
      }
      next();
    } catch (error) {
      res.status(401);
      if (error == "You have been banned!!!")
         throw new Error(error);
      throw new Error("Not authorized, token failed");
    }
    

  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
