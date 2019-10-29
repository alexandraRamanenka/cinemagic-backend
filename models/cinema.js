const { Schema, model } = require('mongoose');

const cinemaSchema = new Schema(
  {
    city: { type: String, required: [true, 'The city is required'] },
    name: { type: String, required: [true, 'Each cinema must have a name'] },
    address: { type: String, required: [true, 'The adress is required'] }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

cinemaSchema.virtual('halls', {
  ref: 'Hall',
  localField: '_id',
  foreignField: 'cinema'
});

cinemaSchema.pre('findOne', function(next) {
  this.populate('halls');
  next();
});
module.exports = new model('Cinema', cinemaSchema);
