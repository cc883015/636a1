// backend/models/Book.js

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  author:      { type: String },
  imageUrl:    { type: String },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  avgRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', BookSchema);
