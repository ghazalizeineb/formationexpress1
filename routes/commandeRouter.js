var express = require("express");
var router = express.Router();
const commandeController=require('../controllers/commandeController');

router.get('/getAllcommande',commandeController.getAllCommande);
router.get('/getCommandebyid/:id',commandeController.getCommandeByID);
router.post('/addCommande',commandeController.addCommande);
router.put('/updateCommande/:id',commandeController.updateCommande);
router.delete('/deleteCommande/:id',commandeController.deleteCommande);














module.exports=router;