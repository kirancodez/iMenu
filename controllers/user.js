const User = require("../models/user")

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "No user found"
            })
        }
        req.profile = user;
        next();
    });
}

exports.getUser =(req, res) => {
    req.profile.encry_password = undefined;
    req.profile.salt = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}