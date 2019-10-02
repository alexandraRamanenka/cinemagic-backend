const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: { type: String, required: [true, "Login is required"], unique: true },
  email: { type: String, required: [true, "Email is required"] },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 6,
    max: 24
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Please, confirm your password"]
  },
  phone: String,
  avatar: String,
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

userSchema.path("passwordConfirmation").validate(function(value) {
  return this.password === value;
}, "Passwords are not equal");

module.exports = new mongoose.model("User", userSchema);
