const express = require("express");
const Job = require("../models/Job");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// POST job
router.post("/", auth, async (req, res) => {
  const { title, description, skills, budget } = req.body;
  try {
    const job = new Job({
      title,
      description,
      skills,
      budget,
      user: req.user,
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("user", "name");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
