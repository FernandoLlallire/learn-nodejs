
const express = require('express');
const controller = require('../controller/controller');
let router = express.Router();
router.get('/', function(req, res){
    res.sendFile(__dirname + '/../view/index.html');
  });
module.exports = router;