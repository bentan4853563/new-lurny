/* eslint-disable no-undef */
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: false },
  photoURL: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  repeatTimes: { type: Number, default: 10 },
  period: { type: Number, default: 60 },
});

// Create the model from the schema
const User = mongoose.model("user", userSchema);

module.exports = User;
