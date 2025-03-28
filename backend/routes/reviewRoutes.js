// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

// 所有 review 操作都要求登录
router.post('/', authMiddleware, createReview);
router.put('/:reviewId', authMiddleware, updateReview);
router.delete('/:reviewId', authMiddleware, deleteReview);

module.exports = router;
