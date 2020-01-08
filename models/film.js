const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Film name is required'] },
  country: { type: String, required: [true, 'Country is required'] },
  genre: { type: [String] },
  year: { type: String },
  language: { type: String, required: [true, 'Language is required'] },
  restriction: { type: Number },
  description: { type: String },
  trailer: { type: String },
  poster: { type: String },
  rate: { type: Number, default: 10.0 },
  duration: { type: Number, required: [true, 'Duration is required'] },
  hireStartDate: { type: Date, default: Date.now() },
  hireEndDate: { type: Date, required: [true, 'End-of-hire date is required'] }
});

module.exports = new mongoose.model('Film', filmSchema);
