const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Comment", commentSchema);