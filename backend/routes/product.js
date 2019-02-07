'use strict';

let ProductController = require('../controllers/product');
let express = require('express');
let api = express.Router();

api.get('/product',ProductController.getProducts);
api.post('/product',ProductController.saveProduct);
api.put('/product/:id',ProductController.updateProduct);
api.delete('/product/:id',ProductController.deleteProduct);
module.exports = api;