const { request } = require("express");
const express = require("express");
const router = express.Router();
const { getUserById, getUser } = require("../controllers/user");
const { isSignedIn, isAuhendicated, isAdmin, isChef } = require("../controllers/auth")

// params
router.param("userID", getUserById);

// routes
router.get("/getuser/:userID", isSignedIn, isAuhendicated, isChef, getUser);

module.exports = router;