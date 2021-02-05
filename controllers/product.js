const Product = require("../models/product");
const formidable = require('formidable');
const fs = require("fs");


exports.getProducById = (req, res, next, id) => {
    Product.findById(id).exec((err, user) => {
        if(err || !product){
            return res.ststus(400).json({
                error: "No product found"
            })
        }
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {

        const { name, description, price, category,  } = fields
        if(!name ||
            !description ||
            !price ||
            !category
            ){
                return res.status(400).json({
                    error: "Please include all fields"
                })
            }
        if(err){
            return res.status(400).json({
                error: "Could'nt save because of the file problem"
            })
        }

        let product = new Product(fields);
        if(file.photo){
            
        }
    })
}