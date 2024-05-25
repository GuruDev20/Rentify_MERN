const express=require('express')
const router=express.Router();
// const JWT=require('../strategies/JWT');
// const AuthController=require('../controller/AuthController');
router.post('/signup', AuthController.signup);
router.post('/login',AuthController.login);
// router.get('/profile',JWT.validateToken,AuthController.profile)
router.post('/logout',AuthController.logout);
module.exports=router;