// backend/models/Review.js

const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating:  { type: Number, default: 0 },
  comment: { type: String, default: '' }
});

module.exports = mongoose.model('Review', ReviewSchema);
