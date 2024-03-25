const Post = require('../model/postModel');
const Comment = require('../model/commentModel');

const createComment = async(req, res) => {
    const { user ,post, body } = req.body;
    try {
        const comment = new Comment({user ,post, body});
        const savedComment = await comment.save();
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id}}, { new: true })
                            .populate("comments")
                            .exec();
        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "comment posted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: "Try again later..."
        })
    }
}

const deleteComment = async(req, res) =>{
    const { post, comment } = req.body;
    try {
        await Comment.findByIdAndDelete({_id: comment});

        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: {comments: comment}}, {new: true})
                            .populate('comments')
                            .populate('likes')
                            .exec();

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Comment removed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: "try again later..."
        })
    }
}

module.exports = { createComment, deleteComment }

