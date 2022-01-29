const Product = require('../models/productModel');
exports.getProducts = async (req, res)=>{
    Product.find()   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getProductById = async (req,res)=>{
    Product.findById(req.params.id)   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.getProductByName = async (req,res)=>{
    Product.find({name: new RegExp(req.params.name)})   // db.product.find()
    .exec((err,data)=>{
        res.status(200).json({
            msg: "OK",
            data: data
        });
    });
};

exports.addProduct = async (req,res)=>{
    try {
        let product = new Product({
            name: req.body.name,
            price: req.body.price,
            unit_in_stock: req.body.unit_in_stock,
        });
        // เก็บผลลัพธืจากการเพิ่มข้อมูล
        let createdProduct = await product.save(); //asynchronous
        res.status(200).json({
            msg: "Add a product complete.",
            data: createdProduct
        });
    } catch (err) {
        // เมื่อเกิด error จะส่ง  error message ออกไปด้วย
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
};

exports.editWholeProduct = async (req,res)=>{
    // req.params.id = id ของ product 
    // req.body = ข้อมูล product ที่จะ update
    let product = {
        name: req.body.name,
        price: req.body.price,
        unit_in_stock: req.body.unit_in_stock
    };
    Product.findByIdAndUpdate(req.params.id,product)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Product.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.editProduct = async (req,res)=>{
    let reviewData = {
        $push : {
            reviews: {
                star: req.body.star,
                comment: req.body.comment
            }
        }
    };
    Product.findByIdAndUpdate(req.params.id,reviewData)
    .exec((err,data)=>{
        // findById อีกรอบเพื่อเอา data ใหม่
        Product.findById(req.params.id)
        .exec((err,data)=>{
            res.status(200).json({
                msg: "OK",
                data: data
            });
        });
    });
};

exports.deleteProduct = async (req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .exec((err,data)=>{
        res.status(200).json({
            msg: `Product id ${req.params.id} is deted`
        });
    });
};
