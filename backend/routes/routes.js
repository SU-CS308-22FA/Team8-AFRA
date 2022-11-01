const express = require("express");
const router = express.Router();
const User = require('../models/signupmodels');

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

module.exports = router;
