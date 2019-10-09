const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
  film: {
    type: Schema.Types.ObjectId,
    ref: "Film",
    require: [true, "Film is required"]
  },
  time: {
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

module.exports = new model("Session", sessionSchema);
