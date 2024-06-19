var express = require("express");
var router = express.Router();
const platController=require('../controllers/platController');
const upload=require('../middlewares/uploadfile');

router.get('/getallplat',platController.getAllplats);
router.get('/getplatbyid/:id',platController.getplatByID);
router.post('/addplat',upload.single("image_plat"),platController.addplat);
router.put('/updateplat/:id',platController.updatePlat);
router.put('/upplat/:id',upload.single("image_plat"),platController.updatePlat);

router.delete('/deleteplat/:id',platController.deleteplat);








module.exports=router;