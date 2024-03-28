const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");
const PostController = require("../controllers/PostController");
const ReactionController = require("../controllers/ReactionController");
const CommentController = require("../controllers/CommentController");
const AuthVerify =  require("../Middlewares/AuthVerify");
const PokeController = require("../controllers/PokeController");

//User
router.post('/register', UserController.register);
router.post('/login', UserController.userLogin);
router.get('/users/:user_id', AuthVerify, UserController.getUserDetails);
router.put('/users/:user_id', AuthVerify, UserController.updateUserProfile);
router.delete('/users/:user_id', AuthVerify, UserController.deleteUser);

//Post
router.post('/posts', AuthVerify, PostController.createPost);
router.get('/posts/:post_id', AuthVerify, PostController.getPost);
router.get('/posts', AuthVerify, PostController.getAllPosts);
router.put('/posts/:post_id', AuthVerify, PostController.updatePost);
router.delete('/posts/:post_id', AuthVerify, PostController.deletePost);

//Reaction
router.post('/reactions', AuthVerify, ReactionController.toggleReaction);
router.get('/reactions/:reaction_id', AuthVerify, ReactionController.getReaction);
router.get('/reactions', AuthVerify, ReactionController.getAllReactions);
router.put('/reactions/:reaction_id', AuthVerify, ReactionController.updateReaction);
router.delete('/reactions/:reaction_id', AuthVerify, ReactionController.deleteReaction);

// Comment
router.post('/comments', AuthVerify, CommentController.addComment);
router.get('/comments/:comment_id', AuthVerify, CommentController.getComment);
router.get('/comments', AuthVerify, CommentController.getAllComments);
router.put('/comments/:comment_id', AuthVerify, CommentController.updateComment);
router.delete('/comments/:comment_id', AuthVerify, CommentController.deleteComment);

//Pokapoki
router.post('/poke', PokeController.pokeUser);

module.exports = router;
