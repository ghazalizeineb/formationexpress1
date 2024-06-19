var express = require("express");
var router = express.Router();
const avisController=require('../controllers/avisController');




router.get('/getallavis',avisController.getAllavis);
router.get('/getavisbyid/:id',avisController.getAvisByID);
router.post('/addavis',avisController.addAvis);
router.put('/updateavis/:id',avisController.updateavis);
router.delete('/deleteavis/:id',avisController.deleteavis);














module.exports=router;