'use strict';

let Store = require('../models/store');

function getStores(req,res){
    Store.find((err,stores)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!stores){
                res.status(404).send({message:'The stores collection is empty'});
            } else {
                res.status(200).send({stores});
            }
        }
    });
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

function updateStore(req,res){
    let storeId = req.params.id;
    let params = req.body;

    Store.findByIdAndUpdate(storeId,params,(err,updatedStore)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!updateStore){
                res.status(404).send({message:'The store doesn´t exist'});
            } else {
                res.status(200).send({store:updatedStore});
            }
        }
    }); 
}

function deleteStore(req,res){
    let storeId = req.params.id;

    Store.findByIdAndRemove(storeId,(err,deletedStore)=>{
        if(err){
            res.status(500).send({message:'there is an error on the server'});
        } else {
            if(!deleteStore){
                res.status(404).send({message:'The store doesn´t exist'});
            } else {
                res.status(200).send({store:deletedStore});
            }
        }
    });
}


module.exports = {
    getStores,
    saveStore,
    updateStore,
    deleteStore
}