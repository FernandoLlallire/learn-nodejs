const express =  require("express");
const routerController = require('../controller/promocionesController');
let router = express.Router();

/*routes*/
router.get('/', routerController.promociones);
router.put('/refresh', routerController.refresh);
router.delete('/clean', routerController.clean);
module.exports = router;