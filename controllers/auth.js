const { body, validationResult } = require('express-validator');
const User = require("../models/user");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.errors[0].msg);
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                error: "User insertion failed"
            })
        }
        return res.json(user);
    })

}

exports.signin =(req, res) => {
    const  { email, password } = req.body;
    User.findOne({email}).exec((err, user) => {

        if(err || !user){
            return res.status(400).json({
                error: "No user found in this email address"
            })
        }
        if(!user.authendicate(password)){
            return res.json("The password entered is doesint match")
        }
        
        // set token
        var token = jwt.sign({ _id: user._id }, process.env.SECRET);
        // Set cookie
        res.cookie("token", token, {expire: new Date() + 9999});

        const { _id, name, email, role } = user;
        res.json({token: token, user: _id, name, email, role})

    })
}

exports.isSignedIn = expressJwt({ 
    secret: process.env.PORT,
    userProperty: "auth",
    algorithms: ['RS256'],
})

exports.isAuhendicated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(400).json({
            error: "User not authendicated"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if(!req.profile.role == "1"){
        return res.status(400).json({
            error: "Entry denide"
        })
    }
    next();
}

exports.isChef = (req, res, next) => {
    if(!req.profile.role == "2"){
        return res.ststus(400).json({
            error: "Entry denide"
        })
    }
    next();
}