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

const verifyUser = asyncHandler(async (req, res) => {
    //console.log(req.body);
    const proreq = await proRequest.findById(req.body.id);
    //console.log(proreq);
    const user = await User.findById(proreq.user)
    //console.log(user);
    
    //console.log(request);
    if(req.body.role !== "deny")
   {
      user.role = req.body.role;
      user.accepted = true;
      User.updateOne({_id:proreq.user},{role:user.role, accepted:user.accepted}, function(err, docs){
        if(err)
        console.log(err)
        else
            console.log(docs)
      });
   } 
   const request = await proRequest.deleteOne({_id: req.body.id})
   res.status(200);
})
export { getAllRequests, verifyUser};