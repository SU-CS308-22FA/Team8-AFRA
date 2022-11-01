const express = require("express");
const router = express.Router();
const User = require('../models/signupmodels');

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

