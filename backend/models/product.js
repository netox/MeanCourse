'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = Schema({
    name:String,
    description:String,
    brand:String,
    price:Number,
    image:String
});

module.exports = mongoose.model('Product',productSchema);
    
