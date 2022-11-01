const express = require("express");
const router = express.Router();
const User = require('../models/signupmodels');

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
                            password: request.body.password
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
                    console.log("Im sending the docs");
                    response.json(docs); 
                }   
                else
                    response.send("wrong password");
            }
        }
    });
})

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
               
                response.send("done");
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

