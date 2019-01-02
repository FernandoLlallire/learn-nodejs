const express =  require("express");
const routerController = require('../controller/promocionesController');
let router = express.Router();

/*routes*/
router.get('/promociones', routerController.promociones)

module.exports = router;