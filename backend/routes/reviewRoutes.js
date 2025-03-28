const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// 登录用户可对书籍进行评论/评分 CRUD
router.post('/', authMiddleware, createReview);
router.put('/:reviewId', authMiddleware, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
