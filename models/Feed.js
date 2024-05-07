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
  learn_count: {
    type: Number,
    default: 1,
  },
  last_learned: {
    type: Date,
  },
  // repeat: {
  //   type: Number,
  // },
  // period: {
  //   type: Number,
  // },
});

module.exports = mongoose.model("feed", FeedSchema);
