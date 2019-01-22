const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const user = require('./routes/users');
const video = require('./routes/videos');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
/*
Hay que tener cuidado al pasar de yaml a json necesitamos algo que convierta los formatos.
Yaml es mejor para trabajar por que podemos leerlo mas facil 
https://www.npmjs.com/package/swagger-ui-express
Ademas necesitamos pasarle todo el path al YAML.load 
https://stackoverflow.com/questions/50105334/cant-read-a-file-inside-functions-folder
*/
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.resolve(__dirname,'./api/swagger/swagger.yaml'));




const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/public', express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use('/video', video);
app.use('/', user);
module.exports = app;