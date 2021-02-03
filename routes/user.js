const express = require("express");
const router = express.Router();
const { getUserById,getUser } = require("../controllers/user")

// params
router.param("userID", getUserById);

// routes
router.getUser("/getUser/:userId", getUser);

module.exports = router;