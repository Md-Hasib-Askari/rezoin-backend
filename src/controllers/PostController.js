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
    const post_id = req.params.post_id;
    try {
        const post = await PostModel.findById(post_id);
        if (!post) {
            return res.status(404).json({status: "error", message: "Post not found"});
        }
        return res.status(200).json({status: "success", data: post});
    } catch (e) {
        return res.status(500).json({status: "error", message: "Internal server error"});
    }

};

const getAllPosts = async (req, res) => {
    const author_id = req.headers.user_id;
    try {
        const posts = await PostModel.find({author_id}).sort({createdAt: -1});
        return res.status(200).json({status: "success", data: posts});
    } catch (e) {
        return res.status(500).json({status: "error", message: "Internal server error"});
    }
};

const updatePost = async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.headers.user_id;
    const { content } = req.body;
    try {
        const post = await PostModel.findByIdAndUpdate({_id: post_id, author_id: user_id}, {content}, {new: true});
        if (!post) {
            return res.status(404).json({status: "error", message: "Post not found"});
        }
        return res.status(200).json({status: "success", message: "Post updated successfully"});
    } catch (e) {
        console.log(e)
        return res.status(500).json({status: "error", message: "Internal server error"});
    }
};

const deletePost = async (req, res) => {
    const post_id = req.params.post_id;
    const user_id = req.headers.user_id;
    try {
        const post = await PostModel.findByIdAndDelete({_id: post_id, author_id: user_id});
        if (!post) {
            return res.status(404).json({status: "error", message: "Post not found"});
        }
        return res.status(200).json({status: "success", message: "Post deleted successfully"});
    } catch (e) {
        return res.status(500).json({status: "error", message: "Internal server error"});
    }
};

module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost
}