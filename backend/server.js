const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const jobRoutes = require("./routes/jobs");
app.use("/api/jobs", jobRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🎯 Job Tracker API is running!");
});

// Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));
