var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController');
const upload =require('../middlewares/uploadfile');
router.get('/getallusers',userController.getUsers);
router.get('/getuserbyid/:id',userController.getUsersByID);
router.post('/adduser',userController.addUser);
router.post('/adduserwithfile',upload.single("image_User"),userController.addUserwithfile);
router.put('/updateuser/:id',userController.updateUser);
router.put('/updatepassword/:id',userController.updatepassword);
router.delete('/deletuser/:id',userController.deletetUser);


module.exports = router;