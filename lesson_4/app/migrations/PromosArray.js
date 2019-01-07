// grab the things we need
const mongoose = require ('mongoose');
const promosSchema = require('./promociones').schema;
const Schema = mongoose.Schema;

// create a schema
let promosArraySchema = new Schema({
  promosChildren: [promosSchema]
});

// the schema is useless so far
// we need to create a model using it
let PromosArray = mongoose.model('PromosArray', promosArraySchema);

// make this available to our users in our Node applications
module.exports = PromosArray;
