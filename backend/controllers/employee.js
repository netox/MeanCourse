'use strict';

let Employee = require('../models/employee');

function getEmployees(req,res){
    let employeeId = req.params.id;

    let find = (!employeeId)? Employee.find() : Employee.findById(employeeId);

    find.populate({path:'store'}).exec((err,employees)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!employees){
                res.status(404).send({message:'The employee collections is empty'});
            } else {
                res.status(200).send({employees});
            }
        }
    });
}

function saveEmployee(req,res){
    let employee = new Employee();
    let params = req.body;

    employee.name = params.name;
    employee.lastName = params.lastName;
    employee.age = params.age;
    employee.email = params.email;
    employee.jobTitle = params.jobTitle;
    employee.store = params.store;

    employee.save((err,savedEmployee)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!savedEmployee){
                res.status(404).send({message:'The information is incomplete'});
            } else {
                res.status(200).send({employee:savedEmployee});
            }
        }
    });

}

function updateEmployee(req,res){
    let employeeId = req.params.id;
    let params = req.body;

    Employee.findByIdAndUpdate(employeeId,params,(err,updatedEmployee)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!updatedEmployee){
                res.status(404).send({message:'The employee doesn´t exist'});
            } else {
                res.status(200).send({employee:updatedEmployee});
            }
        }
    });
}

function deleteEmployee(req,res){
    let employeeId = req.params.id;

    Employee.findByIdAndRemove(employeeId,(err,deletedEmployee)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!deletedEmployee){
                res.status(404).send({message:'The employe doesn´t exist'});
            } else {
                res.status(200).send({employee:deletedEmployee});
            }
        }
    });
}

module.exports = {
    getEmployees,
    saveEmployee,
    updateEmployee,
    deleteEmployee
    
}