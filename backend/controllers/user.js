'use strict';

let User = require('../models/user');
let bcrypt = require('bcrypt-nodejs');
let fs = require('fs');
let path = require('path');
let jwt = require('../services/jwt');


function getUsers(req,res){
    User.find((err,users)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!users){
                res.status(404).send({message:'The users collections is empty'});
            } else {
                res.status(200).send({users});
            }
        }
    });
}


function saveUser(req,res){
    let user = new User();
    let params = req.body;

    user.name = params.name;
    user.lastName = params.lastName;
    user.email = params.email;
    //user.password = params.password;

    if(params.password){
        bcrypt.hash(params.password,null,null,(err,hash)=>{
            user.password = hash;
            user.save((err,savedUser)=>{
                if(err){
                    res.status(500).send({message:'There is an error on the server'});
                } else {
                    if(!savedUser){
                        res.status(404).send({message:'The user information is incomplete'});
                    } else {
                        res.status(200).send({user:savedUser});
                    }
                }
            });
        });
    } else {
        res.status(404).send({message:'The password field is empty'});
    }

    
}

function updateUser(req,res){
    let userId = req.params.id;
    let params = req.body;

    User.findByIdAndUpdate(userId,params,(err,updatedUser)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!updatedUser){
                res.status(404).send({message:'There user doesn´t exist'});
            } else {
                res.status(200).send({user:updatedUser});
            }
        }
    });
}

function deleteUser(req,res){
    let userId = req.params.id;

    User.findByIdAndRemove(userId,(err,deletedUser)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!deletedUser){
                res.status(404).send({message:'There user doesn´t exist'});
            } else {
                res.status(200).send({user:deletedUser});
            }
        }
    });
}

function saveUserImage(req,res){
    let userId = req.params.id;
   
    if(req.files){
        //console.log(req.files);
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        let fileName = fileSplit[2];

        let extSplit = fileName.split('\.');
        let extFile = extSplit[1];

        if(extFile == 'png' || extFile == 'jpg' || extFile == 'jpeg'){
            User.findByIdAndUpdate(userId,{image:fileName},(err,updatedUser)=>{
                if(err){
                    res.status(500).send({message:'There is an error on the server'});
                } else {
                    if(!updatedUser){
                        res.status(404).send({message:'The user doesn´t exist'});
                    } else {
                        res.status(200).send({user:updatedUser});
                    }
                }
            });
        } else {
            res.status(404).send({message:'The file extension is not valid'});
        }

    } else {
        res.status(404).send({message:'Please upload a image'});
    }
}

function getUserImage(req,res){
    let imageFile = req.params.imageFile;
    let filePath = './uploads/users/' + imageFile;
    fs.exists(filePath,(exist)=>{
        (exist)? res.sendFile(path.resolve(filePath)) : res.status(200).send({message:'The image doesn´t exist'});
    });
}

function userLogin(req,res){
    let params = req.body;
    let email = params.email;
    let password = params.password;

    User.findOne({email:email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'There is an error on the server'});
        } else {
            if(!user){
                res.status(404).send({message:'The email doesn´t exist'});
            } else {
                bcrypt.compare(password,user.password,(err,check)=>{
                    if(check){
                        if(params.getHash){
                            res.status(200).send({
                                token:jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({user});
                        }
                        
                    } else {
                        res.status(200).send({message:'The user or password are invalid'});
                    }
                });
            }
        }
    });
}

module.exports = {
    getUsers,
    saveUser,
    updateUser,
    deleteUser,
    saveUserImage,
    getUserImage,
    userLogin
}

