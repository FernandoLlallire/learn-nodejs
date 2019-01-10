const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const user = require('./routes/users')
//var routes = require('./routes/index');
//var users = require('./routes/users');
//let promociones = require('./routes/promocionesRoutes');

const app = express();

//app.use('/user',user);
console.log("hola")

module.exports = app;