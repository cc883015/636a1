const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, default: '' },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  avgRating: { type: Number, default: 0 },
});

module.exports = mongoose.model('Product', ProductSchema);

//123456