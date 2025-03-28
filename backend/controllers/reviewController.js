const Review = require('../models/Review');
const Book = require('../models/Book');

exports.createReview = async (req, res) => {
  try {
    const userId = req.user.userId; // JWT 解码后
    const { bookId, rating, comment } = req.body;

    const newReview = new Review({ book: bookId, user: userId, rating, comment });
    await newReview.save();

    // 加入到 Book
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    book.reviews.push(newReview._id);
    await book.save();

    // 重新计算平均评分
    await updateBookAverageRating(book._id);

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    await updateBookAverageRating(review.book);

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

    // 从 Book 移除该 review
    const book = await Book.findById(review.book);
    if (book) {
      book.reviews = book.reviews.filter((r) => r.toString() !== reviewId);
      await book.save();
      await updateBookAverageRating(book._id);
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 计算并更新书籍平均分
async function updateBookAverageRating(bookId) {
  const book = await Book.findById(bookId).populate('reviews');
  if (!book || book.reviews.length === 0) {
    book.avgRating = 0;
    return await book.save();
  }
  let total = 0;
  book.reviews.forEach((review) => {
    total += review.rating;
  });
  book.avgRating = (total / book.reviews.length).toFixed(2);
  await book.save();
}
