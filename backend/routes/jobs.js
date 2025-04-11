const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// POST: Add a job
router.post("/", async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Get all jobs
router.get("/", async (req, res) => {
  try {
    const { status, date } = req.query;
    let filter = {};

    if (status) filter.status = status;
    if (date) filter.date = new Date(date);

    const jobs = await Job.find(filter);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH: Update a job
router.patch("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Delete a job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
