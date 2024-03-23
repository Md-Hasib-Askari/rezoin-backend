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
router.post('/posts', AuthVerify, PostController.createPost);
router.get('/posts/:post_id', AuthVerify, PostController.getPost);
router.get('/posts', AuthVerify, PostController.getAllPosts);
router.put('/posts/:post_id', AuthVerify, PostController.updatePost);
router.delete('/posts/:post_id', AuthVerify, PostController.deletePost);


module.exports = router;
