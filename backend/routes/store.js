'use strict';

let express = require('express');
let StoreController = require('../controllers/store');

let api = express.Router();

api.get('/store',StoreController.test);
api.post('/store',StoreController.saveStore);

module.exports = api;