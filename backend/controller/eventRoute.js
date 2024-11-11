const express = require("express");
const userSchema = require("../model/userSchema");
const eventSchema = require("../model/eventSchema");
const feedbackSchema = require("../model/feedbackSchema");
const mongoose = require("mongoose");

const eventRoute = express.Router();

const handleError = (res, error) => {
  console.error(error);
  return res.status(500).json({ message: "Server Error", error: error.message });
};

// User Routes
eventRoute.get("/user-list", async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
});

eventRoute.route("/check-user/:uname")
  .get(async (req, res) => {
    try {
      const user = await userSchema.findOne({ username: req.params.uname });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      handleError(res, error);
    }
  });

// Event Routes
eventRoute.get("/event-list", async (req, res) => {
  try {
    const events = await eventSchema.find();
    res.json(events);
  } catch (error) {
    handleError(res, error);
  }
});

eventRoute.post("/create-event", async (req, res) => {
  try {
    const newEvent = await eventSchema.create(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    handleError(res, error);
  }
});

// Feedback Route
eventRoute.post("/post-feedback", async (req, res) => {
  try {
    const feedback = await feedbackSchema.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = eventRoute;
