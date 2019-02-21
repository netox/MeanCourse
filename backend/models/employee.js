'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let employeeSchema = Schema({
    name:String,
    lastName:String,
    age:Number,
    email:String,
    jobTitle:String,
    store:{type:Schema.ObjectId,ref:'store'}
});

module.exports = mongoose.model('employee',employeeSchema);