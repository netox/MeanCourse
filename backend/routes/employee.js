'use strict';

let EmployeeController = require('../controllers/employee');
let express = require('express');
let api = express.Router();

api.get('/employee/:id?',EmployeeController.getEmployees);
api.post('/employee',EmployeeController.saveEmployee);
api.put('/employee/:id',EmployeeController.updateEmployee);
api.delete('/employee/:id',EmployeeController.deleteEmployee);

module.exports = api;
