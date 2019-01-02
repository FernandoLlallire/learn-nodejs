const  express = require("express");
const routerController = require("./routerController");

let router = express.Router();

router.get("/", routerController.addMsg);
module.exports = router;