const Review = require('../models/Review');
const Product = require('../models/Product');

// 确保所有方法都有明确的exports
exports.createReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, rating, comment } = req.body;

    const newReview = new Review({
      product: productId,
      user: userId,
      rating,
      comment
    });
    await newReview.save();

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    product.reviews.push(newReview._id);
    await product.save();

    await updateProductAverageRating(product._id);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 必须添加这个导出
exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    await updateProductAverageRating(review.product);
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 必须添加这个导出
exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);

    const product = await Product.findById(review.product);
    if (product) {
      product.reviews = product.reviews.filter(r => r.toString() !== reviewId);
      await product.save();
      await updateProductAverageRating(product._id);
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 辅助函数也需要导出（如果其他文件需要调用）
async function updateProductAverageRating(productId) {
  const product = await Product.findById(productId).populate('reviews');
  if (!product || product.reviews.length === 0) {
    product.avgRating = 0;
    return await product.save();
  }
  const total = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.avgRating = (total / product.reviews.length).toFixed(2);
  await product.save();
}