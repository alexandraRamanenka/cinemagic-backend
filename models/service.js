const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceType',
    required: [true, 'Service type is required']
  },
  price: { type: Number, required: [true, 'Price is required'] }
});

module.exports = new mongoose.model('Service', serviceSchema);
