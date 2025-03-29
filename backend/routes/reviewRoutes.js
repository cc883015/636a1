const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// 添加方法存在性检查
if (!reviewController.updateReview || !reviewController.deleteReview) {
  throw new Error('Controller methods missing! Check reviewController exports');
}

router.post('/', authMiddleware, reviewController.createReview);
router.put('/:reviewId', authMiddleware, reviewController.updateReview);
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;