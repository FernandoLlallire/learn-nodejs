const express =  require("express");
const routerController = require('../controller/promocionesController');
let router = express.Router();

/*routes*/
router.get('/', routerController.promociones)
router.get('/refresh', routerController.refresh)
router.get('/clean', routerController.clean)
module.exports = router;