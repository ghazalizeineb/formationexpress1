var express = require("express");
var router = express.Router();
const menuConroller=require('../controllers/menuController');

router.get('/getmenu',menuConroller.getmenu);
router.get('/getmenubyid/:id',menuConroller.getmenuByID);

router.post('/addmenu',menuConroller.addMenu); 
 router.put('./updatemenu',menuConroller.updatemenu);
 router.delete('./deletemenu',menuConroller.deletemenu);

module.exports = router;
