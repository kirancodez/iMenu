const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth")
const { check } = require('express-validator');

router.get("/signup", 
check("name").isLength({min: 3 }).withMessage("Please provide a name which consist minimum of 3 characters"),
check("email").isEmail().withMessage("Please provide a valid Email address"),
check("number").isNumeric().withMessage("Pleae enter only numeric values in Phone number field")
.isLength({min:10}).withMessage("Please enter a phone number consist of 10 charecters")
.isLength({max:10}).withMessage("please enter a phone number conist of less than 12 numbers"),
check("password").isLength({min: 5}).withMessage("Please provide a password which has minimum length of 5 characters"),
signup);

router.get("/signin",
check("email").isEmail().withMessage("Please provide a valid Email address"),
check("password").isLength({min: 5}).withMessage("Please provide a password which has minimum length of 5 characters"),
signin);

module.exports = router;
