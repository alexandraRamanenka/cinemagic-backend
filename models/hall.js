const { Schema, model } = require("mongoose");
const lineSchema = require("./line");

const hallSchema = new Schema({
  cinemaId: {
    type: Schema.Types.ObjectId,
    ref: "Cinema",
    required: [true, "Cinema is required"]
  },
  seatsSchema: {
    type: [lineSchema],
    required: [true, "Seats schema is required"]
  }
});

module.exports = new model("Hall", hallSchema);
