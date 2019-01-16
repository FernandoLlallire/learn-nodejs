const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const user = require('./routes/users');
const video = require('./routes/videos');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());//Para poder obtener los datos del body
app.use(bodyParser.urlencoded());//para el parseo
app.use(cookieParser());
app.use('/video', video);
app.use('/', user);
module.exports = app;