const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        require: true,
        trim: true,
        maxlength: 40
    },
    description: {
        type: String,
        require: true,
        trim: true,
        maxlength: 100
    },
    photo: {
        type:Buffer,
        contentType: String
    },
    price: {
        type: String,
        require: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    available: {
        type: String,
        default: "Available",
        enum: ["Available", "NotAvailable"]
    }
}); 

module.exports = mongoose.model("Product", productSchema);