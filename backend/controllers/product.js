'use strict';

let Product = require('../models/product');

function getProducts(req,res){
    Product.find((err,products)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server '});
        } else {
            if(!products){
                res.status(404).send({message:'The product´s collections is empty'});
            } else {
                res.status(200).send({products:products});
            }
        }
    });
}


function saveProduct(req,res){
    let product = new Product();
    let params = req.body;

    product.name = params.name;
    product.description = params.description;
    product.brand = params.brand;
    product.price = params.price;
    product.image = 'null';

    product.save((err,savedProduct)=>{
        /*let message = (err)? 'There is an error on the server' : (!savedProduct)? 'The information is incomplete' : savedProduct;
        let status = (err)? 500 : (!savedProduct)? 404 : 200;
        res.status(status).send({message:message});*/
        if(err){
            res.status(500).send({message:'There is an error on the server '});
        } else {
            if(!savedProduct){
                res.status(404).send({message:'The information is incomplete'});
            } else {
                res.status(200).send({product:savedProduct});
            }
        }
    });

}

function updateProduct(req,res){
    let productId = req.params.id;
    let params = req.body;

    Product.findByIdAndUpdate(productId,params,(err,updatedProduct)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!updatedProduct){
                res.status(404).send({message:'The product doesn´t exist'});
            } else {
                res.status(200).send({product:updatedProduct});
            }
        }
    });
}

function deleteProduct(req,res){
    let productId = req.params.id;

    Product.findByIdAndRemove(productId,(err,deletedProduct)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!deletedProduct){
                res.status(404).send({message:'The product doesn´t exist'});
            } else {
                res.status(200).send({product:deletedProduct});
            }
        }
    });
}

module.exports = {
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}