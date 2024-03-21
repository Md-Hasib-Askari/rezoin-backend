const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

//User
router.post('/register', UserController.register);
router.post('/login', UserController.userLogin);
router.post('/users', UserController.createUser);
router.get('/users/:user_id', UserController.getUserDetails);
router.put('/users/:user_id', UserController.updateUserProfile);
router.delete('/users/:user_id', UserController.deleteUser);


module.exports = router;
