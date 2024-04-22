const mongoose = require("mongoose");

const FeedSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  lurny: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "lurnies",
  },
  repeat: {
    type: Number,
  },
  period: {
    type: Number,
  },
  count: {
    type: Number,
    default: 1,
  },
  lastLearned: {
    type: Date,
  },
});

module.exports = mongoose.model("feed", FeedSchema);
