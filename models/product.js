const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  size: Number,
  price: Number,
  imageUrl: String
});

module.exports = mongoose.model('Product', productSchema);