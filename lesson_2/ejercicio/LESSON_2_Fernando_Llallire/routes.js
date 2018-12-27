var express = require("express");
var routerController = require("./routerController");

var router = express.Router();

router.get("/", routerController.addMsg);
module.exports = router;