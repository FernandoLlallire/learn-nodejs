// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var promosSchema = new Schema({
  nombre: String
});

// the schema is useless so far
// we need to create a model using it
var Promos = mongoose.model('Promos', promosSchema);

// make this available to our users in our Node applications
module.exports = Promos;
