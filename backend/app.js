'use strict';

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//load Routes
let UserRoutes = require('./routes/user');
let ProductRoutes = require('./routes/product');
let StoreRoutes = require('./routes/store');
let EmployeeRoutes = require('./routes/employee');
//headers configurations

app.use('/system',UserRoutes);
app.use('/system',ProductRoutes);
app.use('/system',StoreRoutes);
app.use('/system',EmployeeRoutes);

module.exports = app;


