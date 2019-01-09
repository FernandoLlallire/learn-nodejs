
const express = require('express');
const controller = require('../controller/controller');

let router = express.Router();
router.get('/chat', controller.chat);
module.exports = router;