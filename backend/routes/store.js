'use strict';

let express = require('express');
let StoreController = require('../controllers/store');

let api = express.Router();
let md_auth = require('../middleware/authenticated');

api.get('/store',md_auth.ensureAuth,StoreController.getStores);
api.post('/store',md_auth.ensureAuth,StoreController.saveStore);
api.put('/store/:id',md_auth.ensureAuth,StoreController.updateStore);
api.delete('/store/:id',md_auth.ensureAuth,StoreController.deleteStore);

module.exports = api;