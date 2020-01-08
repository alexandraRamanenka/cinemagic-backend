const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  image: { type: String }
});

module.exports = new mongoose.model('Service', serviceSchema);
