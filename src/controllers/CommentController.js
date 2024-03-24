const CommentModel = require('../models/CommentModel');
const PostModel = require("../models/PostModel");

const addComment = async (req, res) => {
    try {
        const user_id = req.headers.user_id;
        const newComment = await CommentModel.create({ user_id, ...req.body });
        await PostModel.findByIdAndUpdate(post_id, { $inc: { commentCount: 1 } });
        return res.status(201).json({status: 'success', data: newComment});
    } catch (error) {
        return res.status(500).json({status: "error", error: error.message });
    }
}

const getComment = async (req, res) => {
    try {
        const comment = await CommentModel.findById(req.params.comment_id);
        return res.status(200).json({status: 'success', data: comment});
    } catch (error) {
        return res.status(500).json({status: "error", error: error.message });
    }
}

const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find();
        return res.status(200).json({status: 'success', data: comments});
    } catch (error) {
        return res.status(500).json({status: "error", error: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const comment = await CommentModel.findByIdAndUpdate(req.params.comment_id, req.body, { new: true });
        return res.status(200).json({status: 'success', data: comment});
    } catch (error) {
        return res.status(500).json({status: "error", error: error.message });
    }
}

const deleteComment = async (req, res) => {
    try {
        const {post_id} = req.body;
        await CommentModel.findByIdAndRemove(req.params.comment_id);
        await PostModel.findByIdAndUpdate(post_id, { $inc: { commentCount: -1 } });
        return res.status(200).json({status: 'success', message: 'Comment deleted successfully'});
    } catch (error) {
        return res.status(500).json({status: "error", error: error.message });
    }
}

module.exports = {
    addComment,
    getComment,
    getAllComments,
    updateComment,
    deleteComment
}