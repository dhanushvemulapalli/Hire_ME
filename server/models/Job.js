const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  budget: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", jobSchema);
