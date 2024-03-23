const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const AuthVerify =  require("../Middlewares/AuthVerify");

//User
router.post('/register', UserController.register);
router.post('/login', UserController.userLogin);
router.get('/getUser/:user_id', AuthVerify, UserController.getUserDetails);
router.put('/updateUser/:user_id', AuthVerify, UserController.updateUserProfile);
router.delete('/deleteUser/:user_id', AuthVerify, UserController.deleteUser);

module.exports = router;
