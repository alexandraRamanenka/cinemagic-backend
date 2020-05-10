const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceType',
    required: [true, 'Service type is required']
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Service name is required']
  },
  description: {
    type: mongoose.Schema.Types.String
  },
  image: {
    type: mongoose.Schema.Types.String
  },
  price: { type: Number, required: [true, 'Price is required'] }
});

serviceSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'type'
  });
  next();
});

module.exports = new mongoose.model('Service', serviceSchema);
