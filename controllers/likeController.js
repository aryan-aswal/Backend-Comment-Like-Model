const Like = require('../model/likeModel');
const Post = require('../model/postModel');

const likePost = async(req, res) => {
    const { user, post } = req.body;
    try {
        const like = new Like({user, post});

        const savedLike = await like.save();

        const updatedPost = await Post.findByIdAndUpdate(post, { $push: {likes: savedLike.id} }, {new: true})
                            .populate('comments')
                            .populate('likes')
                            .exec();

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Liked successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Interval server error",
            message: "Try again later..."
        })
    } 
}

const unlikePost = async(req, res) =>{
    const { post, like } = req.body;
    try {
        const deletedLike = await Like.findByIdAndDelete({_id: like});
        
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: {likes: like} }, {new: true})
                            .populate('comments')
                            .populate('likes')
                            .exec();
    
        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Like removed"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message,
            message: "Try again later"
        })
    }
}

module.exports = { likePost, unlikePost }