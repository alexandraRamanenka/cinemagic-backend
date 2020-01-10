const { Schema, model } = require('mongoose');

const cinemaSchema = new Schema(
  {
    city: { type: String, required: [true, 'The city is required'] },
    name: { type: String, required: [true, 'Each cinema must have a name'] },
    address: { type: String, required: [true, 'The adress is required'] },
    services: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Service'
        }
      ],
      default: []
    }
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

cinemaSchema.pre(/^find/, function(next) {
  this.populate('halls');
  next();
});
module.exports = new model('Cinema', cinemaSchema);
