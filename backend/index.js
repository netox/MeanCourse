'use strict';

let mongoose = require('mongoose');
let app = require('./app');
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/store',(err)=>{
    if(err){
        console.log('Hay un error en la conexion');
    } else {
        console.log('Base de Datos en linea');
        app.listen(PORT,(error)=>{
            (error)? console.log('No se puede levantar') : console.log('Servidor Web en linea');
        });
    }
});

