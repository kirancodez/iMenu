const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new schema({
    name: {
        type: String,
        trim: true,
        require: true,
        maxlength: 20
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
        maxlength: 14,
        require: true
    },
    encry_password: {
        type: String,
        require: true,
    },
    salt:String,
    role: {
        type:String,
        default: 0
    },
    purchase: {
        type: Array,
        default: []
    }
},{timestamps: true});


// Virtual fields
userSchema.virtual("password")
.set(function(password){
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
})

userSchema.virtual("number")
.set(function(number){
    this.phone = "+91-"+ number
})


// methods
userSchema.methods = {
    securePassword : function(planepassword){
        return crypto.createHmac('sha256', this.salt)
                   .update(planepassword)
                   .digest('hex');
    },
    authendicate: function(planepassword){
        return this.securePassword(planepassword) == this.encry_password
    }
}


module.exports = mongoose.model( "User", userSchema );