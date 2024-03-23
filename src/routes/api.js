const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const AuthVerify =  require("../Middlewares/AuthVerify");

//User
router.post('/register', UserController.register);
router.post('/login', UserController.userLogin);
router.get('/getUser/:user_id', AuthVerify, UserController.getUserDetails);
router.put('/updateUser/:user_id', AuthVerify, UserController.updateUserProfile);
router.delete('/deleteUser/:user_id', AuthVerify, UserController.deleteUser);

//Post
router.post('/createPost', AuthVerify, PostController.createPost);
router.get('/getPost/:post_id', AuthVerify, PostController.getPost);
router.get('/getAllPosts', AuthVerify, PostController.getAllPosts);
router.put('/updatePost/:post_id', AuthVerify, PostController.updatePost);
router.delete('/deletePost/:post_id', AuthVerify, PostController.deletePost);


module.exports = router;
