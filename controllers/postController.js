const Post = require('../model/postModel');

const createPost = async(req, res) => {
    const { title, body } = req.body;
    try {
        const post = new Post({title, body});
        const savedPost = await post.save();

        res.status(200).json({
            success: true,
            data: savedPost,
            message: "Post is saved"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: "try again later..."
        })
    }
}

const getAllPost = async(req, res) =>{
    try {
        const posts = await Post.find({}).populate('comments').populate('likes').exec();
        res.status(200).json({
            success: true,
            data: posts,
            message: "All posts fetched successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            data: "Internal server error",
            message: "try again later..."
        })
    }
}

module.exports = { createPost, getAllPost }