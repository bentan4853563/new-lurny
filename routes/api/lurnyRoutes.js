/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lurny = require("../../models/Lurny");

router.get("/get", async (req, res) => {
  try {
    const lurnies = await Lurny.find().sort({ date: -1 }).populate("user");
    res.json(lurnies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/my-lurnies", async (req, res) => {
  try {
    console.log(req.body.user);
    const lurnies = await Lurny.find({ user: req.body.user })
      .sort({
        date: -1,
        shared: 1,
      })
      .populate("user");
    res.json(lurnies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/lurny-update", async (req, res) => {
  try {
    const results = await Lurny.find({ user: { $type: "string" } });

    // Create an array of update operations
    const updateOps = results.map(async (doc) => {
      await Lurny.updateOne(
        { _id: doc._id },
        { $set: { user: new mongoose.Types.ObjectId(doc.user) } }
      );
    });

    // Execute all update operations
    await Promise.all(updateOps);

    res.json({ message: "All eligible documents have been updated." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/insert", async (req, res) => {
  try {
    const { user, title, summary, collections, quiz, image, url } = req.body;
    console.log(user, title);
    const newLurny = new Lurny({
      user,
      title,
      summary,
      quiz,
      image,
      url,
      collections,
    });

    const savedLurny = await newLurny.save();
    console.log("Lurny created successfully:", savedLurny);

    const response = await Lurny.findById(savedLurny._id).populate("user");
    console.log("===>>", response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/share/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Lurny.findByIdAndUpdate(
      id,
      { shared: true }, // Set sharedField to true
      { new: true }
    );

    if (!result) {
      return res.status(404).send("Document shared.");
    }

    res.send(result);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Lurny.findByIdAndDelete(id);

    res.send("Successfully deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/lurnies/:id", async (req, res) => {
  try {
    const deletedLurny = await Lurny.findByIdAndDelete(req.params.id);
    if (!deletedLurny) {
      return res.status(404).json({ message: "Lurny not found" });
    }
    res.json({ message: "Lurny successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/no-url", async (req, res) => {
  try {
    // const result = await Lurny.deleteMany({ url: { $exists: false } });
    // Or if you want to check for both non-existent and null values:
    const result = await Lurny.deleteMany({
      $or: [{ url: { $exists: false } }, { url: null }],
    });

    res.status(200).json({
      message: "Documents without url have been deleted",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
