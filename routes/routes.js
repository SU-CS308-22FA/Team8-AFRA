const express = require("express");
const router = express.Router();
const User = require('../models/signupmodels');
const Request =  require('../models/requestmodel');

//google drive stuff
const multer = require("multer");
const upload = multer({ dest: "public/files" });
const uploadSingleFile = require('../upload');
const deleteDriveFile = require('../delete');
const fs = require("fs");

const deleteFile = (filePath) => { //delete file from local directory
    fs.unlink(filePath, () => {
      console.log("file deleted");
    });
  };

  router.post('/signup', (request, response) => {
    const emaila = request.body.email;
    const usernamea = request.body.username;
    User.findOne({email: emaila}, function(err, docs){
        if(err){
            console.log(err);
        }
        else {
            console.log("Result : ", docs);
            if(docs == null)
            {
              User.findOne({username: usernamea}, function(err, docs){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    if(docs == null)
                    {
                        const signedUpUser = new User({
                            fullName: request.body.fullName,
                            email: request.body.email,
                            username: request.body.username,
                            password: request.body.password,
                            accepted: true
                        })
                        signedUpUser.save(function(err, user){
                            if(err)
                                response.json("Can't leave fields empty");
                            else 
                              response.json(signedUpUser);

                        })
                    }
                    else
                        response.send("Username taken");
                }
              })
            }
            else
            {
                response.send("Email already used.");
            }
        }
    });
})


router.post('/prosignup', (request, response) => {
    const emaila = request.body.email;
    const usernamea = request.body.username;
    User.findOne({email: emaila}, function(err, docs){
        if(err){
            console.log(err);
        }
        else {
            console.log("Result : ", docs);
            if(docs == null)
            {
              User.findOne({username: usernamea}, function(err, docs){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    if(docs == null)
                    {
                        let l = "https://drive.google.com/file/d/" + request.body.licence;
                        const signedUpUser = new User({
                            fullName: request.body.fullName,
                            email: request.body.email,
                            username: request.body.username,
                            password: request.body.password,
                            licence: l,
                            accepted: false
                        })
                        signedUpUser.save(function(err, user){
                            if(err)
                                response.json("Can't leave fields empty");
                            else 
                            {
                                const proReq = new Request({
                                    email: request.body.email,
                                    licence: l,
                                    accepted: false
                                })
                                proReq.save();
                                response.json(signedUpUser);  
                            } 
                        })
                    }
                    else
                        response.send("Username taken");
                }
              })
            }
            else
            {
                response.send("Email already used.");
            }
        }
    });
})

router.post('/signin', (request, response) => {
    const emaila = request.body.email;
    User.findOne({email: emaila}, function(err, docs){
        if(err){
            console.log(err);
        }
        else {
            console.log("Result : ", docs);
            if(docs == null)
                response.send("User not found");
            else
            {
                const pass = request.body.password;
                if(docs.password === pass) {

                    //check if the user is accepted pro
                    if (docs.accepted !== false)
                    {
                        console.log("Im sending the docs");
                        response.json(docs); 
                    }
                    else
                        response.send("Your licence is not verified yet!");
                }   
                else
                    response.send("wrong password");
            }
        }
    });
})

router.post("/google-drive", upload.single("file"), async (req, res, next) => {
    try {
        if (!req.file) {
          res.send("No file uploaded.");
          return;
        }
        const response = await uploadSingleFile(req.file);
        deleteFile(req.file.path);
        console.log(response.data.id);
        res.json({ id: response.data.id });
      } catch (err) {
        console.log(err);
  }
});

router.post('/drivedelete', (req, res) => {
    var fileId = req.body.licence; // Desired file id to download from  google drive
    console.log("This is drive delete");
    const response = deleteDriveFile(fileId);
    res.send(response.data);
  });


  router.post('/userSettings', (request, response) => {
    const emaila = request.body.email;
    const usernamea = request.body.username;
    User.findOne({username: usernamea}, function(err, docs){
        if(err){
            console.log(err);
        }
        else {
            if(docs != null && docs.email != emaila)
            {    
                User.findOne({email: emaila}, function(err, docs){
                    if(!err){
                        response.json(docs);
                    }
                });
            }
            else
            {
                console.log(request.body);
                User.findOneAndUpdate({email: emaila},
                    {fullName: request.body.fullName, 
                    password: request.body.password, 
                    username: request.body.username}, function(err, docs){
                    console.log(docs);
                });
                response.send("Done");
            }
        }
    });
})

router.post('/delete', (request, response) => {
    console.log("Im here");
    console.log(request.body);
    User.deleteOne({email: request.body.email}, function(err,docs)
    {
        if(!err)
            response.send("done");
        else
            response.send(err);
    });
})

module.exports = router;
