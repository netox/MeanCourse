'use strict';

let Store = require('../models/store');

function test(req,res){
    res.status(200).send({message:'Message from the store controller'});
}

function saveStore(req,res){
    let store = new Store();
    let params = req.body;

    store.name = params.name;
    store.address = params.address;
    store.zipCode = params.zipCode;
    store.city = params.city;
    store.contact = params.contact;
    store.email = params.email;

    store.save((err,savedStore)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!savedStore){
                res.status(404).send({message:'The information is incomplete'});
            } else {
                res.status(200).send({store:savedStore});
            }
        }
    });
}

module.exports = {
    test,
    saveStore
}