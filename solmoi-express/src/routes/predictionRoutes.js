const express = require("express");
const PredictionController = require("../controllers/predictionController");
const router = express.Router();

// Create a new prediction
router.post("/", PredictionController.createPrediction);

// Get all predictions for a user
router.get("/user/:id", PredictionController.getUserPredictions);

// Verify a prediction
router.put("/verify/:id", PredictionController.verifyPrediction);

module.exports = router;
