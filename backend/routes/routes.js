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


module.exports = router;
