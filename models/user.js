const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "Login is required"],
      unique: true
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

userSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "user"
});

userSchema.path("passwordConfirmation").validate(function(value) {
  return this.password === value;
}, "Passwords are not equal");

userSchema.methods.isCorrectPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirmation = undefined;
  next();
});

module.exports = new mongoose.model("User", userSchema);
