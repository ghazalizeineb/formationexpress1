var express = require('express');
var router = express.Router();
const userController=require('../controllers/userController');
const upload =require('../middlewares/uploadfile');
const {requireAuthUser}=require('../middlewares/authentification');


router.get('/login',userController.login); 
router.get('/logout',userController.logout);
router.get('/getuserauth',requireAuthUser,userController.getUserAuth);

router.get('/getallusers',requireAuthUser,userController.getUsers);
router.get('/getage/:age',userController.getAge);
router.get('/getallusertri',userController.getUsersTri);
router.get('/getuserbyid/:id',userController.getUsersByID);
router.get('/getAgebetweenXY',userController.getAgebetweenXY);
router.get('/serachuserbyname',userController.searchUserByName);
router.post('/adduserClient',userController.addUserClient);
router.post('/adduserAdmin',userController.addUserAdmin);
router.post('/adduserwithfile',upload.single("image_User"),userController.addUserwithfile);
router.put('/updateuser/:id',userController.updateUser);
router.put('/updatepassword/:id',userController.updatepassword);
router.delete('/deletuser/:id',userController.deletetUser);


module.exports = router;