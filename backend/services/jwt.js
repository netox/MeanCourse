'use strict';

let jwt = require('jwt-simple');
let moment = require('moment');
let secretKey = 'mat23net90';

function createToken(user){
    let payload = {
        sub:user._id,
        name:user.name,
        lastName:user.lastName,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix
    };

    return jwt.encode(payload,secretKey);
}

module.exports = {
    createToken
}