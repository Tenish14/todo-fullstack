const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//ADD USER
router.post("/", (req, res) =>  {

    //check if the username or if that user alrdy exists
    //If it is not exist store it on the database
    //If it is existing dont store it on the databse and return a message that says alrdy exist
    //Only accept username and password greather than or equal to 8 chacrs
    //If username and password less than 8 chars return  a message that says it should be more than 8 chars

    let user = new User();
    user.name = req.body.name
    user.username = req.body.username
    User.find({"username": user.username}, function(err, checkUser){
            if (err) {
                res.json(err)
            }
            if(checkUser.length) {
                return res.json('User already exists')
            } 
            else{
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(req.body.password, salt)
                user.password = hash
                let passwordCheck = req.body.password
                let usernameCheck = req.body.username
                
                if(passwordCheck.length < 8 ) {
                    res.json('Password must be greather than 8 characters')
                } else if (usernameCheck.length < 8) {
                    res.json('Username must be greather than 8 characters')
                } else {
                user.save()
                res.json({
                    message: "Registered successfully",
                    user
                })
            }
        }

    })
})

module.exports = router;