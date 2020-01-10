const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
  category: { type: String },
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  image: { type: String }
});

module.exports = new mongoose.model('ServiceType', serviceTypeSchema);
