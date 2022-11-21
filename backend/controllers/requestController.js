import proRequest from "../models/requestModel.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const getAllRequests = asyncHandler(async (req, res) => {
    var data = await proRequest.find({});
    var item;
    var lenght = data.length;
    console.log(data)
    res.json(data);
})
export { getAllRequests};