'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = Schema({
    name:String,
    lastName:String,
    email:String,
    password:String,
    role:String,
    image:String
});

module.exports = mongoose.model('User',userSchema);