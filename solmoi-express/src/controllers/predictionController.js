const PredictionService = require("../services/predictionService.js");

const PredictionController = {
  createPrediction: async (req, res) => {
    try {
      const predictionData = req.body;
      const newPrediction =
        await PredictionService.createPrediction(predictionData);
      res.status(201).json({ success: true, data: newPrediction });
    } catch (error) {
      console.error("Controller error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to create prediction" });
    }
  },

  getUserPredictions: async (req, res) => {
    try {
      const user_id = req.params.id;
      const predictions = await PredictionService.getUserPredictions(user_id);
      res.status(200).json({ success: true, data: predictions });
    } catch (error) {
      console.error("Controller error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to get user predictions" });
    }
  },

  verifyPrediction: async (req, res) => {
    try {
      const prediction_id = req.params.id;
      const verifiedPrediction =
        await PredictionService.verifyPrediction(prediction_id);
      res.status(200).json({ success: true, data: verifiedPrediction });
    } catch (error) {
      console.error("Controller error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to verify prediction" });
    }
  },
};

module.exports = PredictionController;
