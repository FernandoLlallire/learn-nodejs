var express = require("express");
var routerController = require("./routerController");

var router = express.Router();
console.log(routerController)
router.get("/:id", routerController.addMsg);
module.exports = router;