var express = require("express");
var router = express.Router();
const avisController=require('../controllers/avisController');




router.get('/getallavis',avisController.getAllavis);
router.get('/getavisbyid/:id',avisController.getavisByID);
router.post('/addavis',avisController.addavis);
router.put('/updateavis/:id',avisController.updateavis);
router.delete('/deleteavis/:id',avisController.deleteavis);














module.exports=router;