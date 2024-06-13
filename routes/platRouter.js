var express = require("express");
var router = express.Router();
const platController=require('../controllers/platController');

router.get('/getallplat',platController.getAllplats);
router.get('/getplatbyid/:id',platController.getplatByID);
router.post('/addplat',platController.addplat);
router.put('/updateplat/:id',platController.updateplat);
router.delete('/deleteplat/:id',platController.deleteplat);








module.exports=router;