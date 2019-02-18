'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');
let secretKey = 'mat23net90';

function ensureAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(404).send({message:'You don´t have the authorization header'});
    }

    let token = req.headers.authorization.replace(/['"]+/g,'');
    let payload;

    try {
        payload = jwt.decode(token,secretKey);
        if(payload.exp < moment().unix()){
            return res.status(200).send({message:'The token has expired'});
        } 
    } catch(ex){
            return res.status(500).send({message:'There is an error on the token'});
    }

    req.user = payload;
    next();
}

module.exports = {
    ensureAuth
}