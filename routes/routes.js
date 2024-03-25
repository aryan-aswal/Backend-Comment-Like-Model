const express = require('express');
const { createPost, getAllPost } = require('../controllers/postController');
const { createComment, deleteComment } = require('../controllers/commentController');
const { likePost, unlikePost } = require('../controllers/likeController');
const router = express.Router();

router.post('/post/create', createPost);
router.get('/get-posts', getAllPost);
router.post('/comments/create', createComment);
router.post('/comments/delete', deleteComment);
router.post('/likes/unlike', unlikePost);
router.post('/likes/like', likePost);

module.exports = router;