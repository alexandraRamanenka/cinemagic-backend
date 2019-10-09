const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
    require: [true, "Film is required"]
  },
  dateTime: {
    type: Date,
    require: [true, "Date and time are required"]
  },
  hall: {
    type: Schema.Types.ObjectId,
    ref: "Hall",
    require: [true, "Hall is required"]
  },
  price: {
    type: Number,
    require: [true, "Price is required"]
  }
});

sessionSchema.pre(/^find/, function(next) {
  this.populate({
    path: "film",
    select: ["name", "duration", "language", "restriction"]
  });
  next();
});

module.exports = new model("Session", sessionSchema);
