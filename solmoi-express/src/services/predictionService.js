const Prediction = require("../models/predictionModel.js");
const Stock = require("../models/stockModel.js");

const PredictionService = {
  createPrediction: async (predictionData) => {
    try {
      // Validate user and stock existence
      const user = await User.findByPk(predictionData.user_id);
      if (!user) {
        throw new Error("User not found");
      }

      const stock = await Stock.findByPk(predictionData.stock_id);
      if (!stock) {
        throw new Error("Stock not found");
      }

      // Create the prediction
      const newPrediction = await Prediction.create({
        prediction_date: predictionData.prediction_date,
        prediction_upordown: predictionData.prediction_upordown,
        is_correct: null, // This will be updated later when the prediction is verified
        user_id: predictionData.user_id,
        stock_id: predictionData.stock_id,
      });

      return newPrediction;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Error creating prediction");
    }
  },

  getUserPredictions: async (user_id) => {
    try {
      const userPredictions = await Prediction.findAll({
        where: { user_id },
        include: [
          {
            model: Stock,
            attributes: ["name", "symbol", "current_price"],
          },
        ],
        order: [["prediction_date", "DESC"]],
      });

      return userPredictions;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Error fetching user predictions");
    }
  },

  verifyPrediction: async (prediction_id) => {
    try {
      const prediction = await Prediction.findByPk(prediction_id, {
        include: [
          {
            model: Stock,
            attributes: ["current_price", "price_change"],
          },
        ],
      });

      if (!prediction) {
        throw new Error("Prediction not found");
      }

      const isCorrect =
        (prediction.prediction_upordown === "UP" &&
          prediction.Stock.price_change > 0) ||
        (prediction.prediction_upordown === "DOWN" &&
          prediction.Stock.price_change < 0);

      await prediction.update({ is_correct: isCorrect });

      return prediction;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Error verifying prediction");
    }
  },
};

module.exports = PredictionService;
