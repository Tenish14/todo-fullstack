const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User') 

//(POST)localhost:4545/auth
router.post("/", (req, res) => {
    //Object Destruction
    const {username, password} = req.body
    
    //Check id the user is exist
    User.findOne({username}, (err, user) => {
        if(!user){
            return res.status(400).json({msg: "User doesn't exist"})
        } 

        let isMatch = bcrypt.compareSync(password, user.password)
        if(!isMatch) {
            return res.status(400).json({msg: "Invalid Credenstials"})
        } 

        //syntax jwt.sign(payload, secrectKey, options, callback)
        let payload = {
            user: {
                id: user.id,
                username: user.username,
                name: user.name
            }
        }

        jwt.sign(
            payload,
            "mysecrectkey",
            {expiresIn: '1h'},
            (err, token) => {
                if(err) return res.status(400).json({err})
                return res.json({token})
            } 
        )
    })
})

module.exports = router