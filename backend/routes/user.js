'use strict';

let express = require('express');
let api = express.Router();
let UserController = require('../controllers/user');

let multiparty = require('connect-multiparty');
let md_upload = multiparty({uploadDir:'./uploads/users'});

let md_auth = require('../middleware/authenticated');

api.get('/user',md_auth.ensureAuth,UserController.getUsers);
api.post('/user',md_auth.ensureAuth,UserController.saveUser);
api.put('/user/:id',md_auth.ensureAuth,UserController.updateUser);
api.delete('/user/:id',md_auth.ensureAuth,UserController.deleteUser);
api.put('/userImage/:id', [md_auth.ensureAuth,md_upload] ,UserController.saveUserImage);
api.get('/userImage/:imageFile',UserController.getUserImage);
api.post('/login',UserController.userLogin);
module.exports = api;                     