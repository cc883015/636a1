const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  avgRating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Book', BookSchema);
