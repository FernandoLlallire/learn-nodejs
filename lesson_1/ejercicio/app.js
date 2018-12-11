const fs = require('fs');
const fn = require('./config.json');
const fecha = new Date();
const argv = require('yargs').argv;
var mostrarDatos = `Mensaje: ${argv.msg}, Fecha: ${fecha.toUTCString()} \n`;

fs.writeFile('./log.html','MSG DEMO' + mostrarDatos, function (err) {
	if(err){
		console.error(err);
	}
	console.log('Archivo Creado');
});

fs.appendFile('./log.html','MSG DEMO' + mostrarDatos, function (err) {
	if(err){
		console.error(err);
	}
	console.log('NuevoRegistro');
});