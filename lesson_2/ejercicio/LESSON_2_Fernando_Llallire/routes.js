var express = require("express");
var routerMiddleware = require("./routerMiddleware");
var routerController = require("./routerController");

var router = express.Router();
router.use(routerMiddleware.msgHandle);
router.get("/:id", routerController.addMsg);
module.exports = router;