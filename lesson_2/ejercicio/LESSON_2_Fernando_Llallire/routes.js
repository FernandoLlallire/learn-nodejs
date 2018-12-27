var express = require("express");
var routerMiddleware = require("./routerMiddleware");
var routerController = require("./routerController");

var router = express.Router();
router.param("id", routerMiddleware.idHandle)
//router.use(routerMiddleware.msgHandle);
router.get("/:id", routerController.addMsg);
router.get("/", routerController.principalPage);
module.exports = router;