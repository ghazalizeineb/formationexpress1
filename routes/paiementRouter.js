var express = require("express");
var router = express.Router();
const paiementController=require('../controllers/paiementController');

router.get('/getallp',paiementController.getAllpaiement);
router.get('/getpbyid/:id',paiementController.getpaiementByID);
router.post('/addp',paiementController.addpaiement);
router.put('/updatep/:id',paiementController.updatepaiement);
router.delete('/deletep/:id',paiementController.deletepaiement);












module.exports=router;