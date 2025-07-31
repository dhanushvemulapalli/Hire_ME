const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  wallet: String,
  skills: [String],
  bio: String,
  linkedin: String,
});

module.exports = mongoose.model("User", userSchema);
