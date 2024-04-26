const express = require("express");
const router = express.Router();

const User = require("../../models/User");
const Lurny = require("../../models/Lurny");
const Feed = require("../../models/Feed");

router.post("/remember", async (req, res) => {
  console.log(req.body);
  const { user_id, lurny_id } = req.body;
  try {
    const check = await Feed.find({ user: user_id, lurny: lurny_id });
    if (check) {
      Lurny.findByIdAndUpdate(check._id, {
        learn_count: check.learn_count,
        last_learned: Date.now(),
      });
    } else {
      const newFeed = new Feed({
        user: user_id,
        lurny: lurny_id,
      });
      newFeed.save();
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/get", async (req, res) => {
  try {
    const feeds = Feed.find().pupulate("user").populate("lurny");
    res.send(feeds);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
