const ReactionModel = require('../models/ReactionModel');
const PostModel = require("../models/PostModel");

const toggleReaction = async (req, res) => {
    try {
        const { post_id } = req.body;
        const user_id = req.headers.user_id;
        const reaction = await ReactionModel.findOne({ user_id, post_id });
        console.log(reaction);
        if (reaction) {
            await ReactionModel.findByIdAndUpdate(reaction._id, { isLiked: !reaction.isLiked });
            await PostModel.findByIdAndUpdate(post_id, { $inc: { reactionCount: reaction.isLiked ? -1 : 1 } });
            return res.status(200).json({status: 'success', message: 'Reaction updated successfully'});
        }
        await ReactionModel.create({ user_id, post_id, isLiked: true });
        await PostModel.findByIdAndUpdate(post_id, { $inc: { reactionCount: 1 } });
        return res.status(201).json({status: 'success', message: 'Reaction added successfully'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getReaction = async (req, res) => {
    try {
        const reaction = await ReactionModel.findById(req.params.reaction_id);
        return res.status(200).json({status: 'success', data: reaction});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllReactions = async (req, res) => {
    try {
        const reactions = await ReactionModel.find();
        return res.status(200).json({status: 'success', data: reactions});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateReaction = async (req, res) => {
    try {
        const reaction = await ReactionModel.findByIdAndUpdate(req.params.reaction_id, req.body, { new: true });
        return res.status(200).json({status: 'success', data: reaction});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteReaction = async (req, res) => {
    try {
        await ReactionModel.findByIdAndRemove(req.params.reaction_id);
        return res.status(200).json({status: 'success', message: 'Reaction deleted successfully'});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    toggleReaction,
    getReaction,
    getAllReactions,
    updateReaction,
    deleteReaction
}