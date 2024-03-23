const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
    const { content } = req.body;
    const author_id = req.headers.user_id;

    if (!content) {
        return res.status(400).json({message: "Content is required"});
    }
    try {
        const newPost = await PostModel({
            content,
            author_id
        });
        await newPost.save();
        return res.status(201).json({status: "success", message: "Post created successfully"});
    } catch (e) {
        return res.status(500).json({status: "error", message: "Internal server error"});
    }
};

const getPost = async (req, res) => {

};

const getAllPosts = async (req, res) => {

};

const updatePost = async (req, res) => {

};

const deletePost = async (req, res) => {

};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
}