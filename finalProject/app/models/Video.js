const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  url: String,
  description: String
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;