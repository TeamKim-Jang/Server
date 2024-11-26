const Prediction = require("../models/predictionModel.js");
const Stock = require("../models/stockModel.js");
const User = require("../models/userModel.js");
const { Op } = require("sequelize");

const PredictionService = {
  createPrediction: async (predictionData) => {
    try {
      // 사용자가 오늘 이미 예측을 했는지 확인
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const existingPrediction = await Prediction.findOne({
        where: {
          user_id: predictionData.user_id,
          prediction_date: {
            [Op.gte]: today,
          },
        },
      });

      if (existingPrediction) {
        throw new Error("사용자가 오늘 이미 예측을 했습니다");
      }

      // 사용자와 주식 존재 여부 확인
      const [user, stock] = await Promise.all([
        User.findByPk(predictionData.user_id),
        Stock.findByPk(predictionData.stock_id),
      ]);

      if (!user) {
        throw new Error("사용자를 찾을 수 없습니다");
      }

      if (!stock) {
        throw new Error("주식을 찾을 수 없습니다");
      }

      // 예측 생성
      const newPrediction = await Prediction.create({
        prediction_date: new Date(),
        prediction_upordown: predictionData.prediction_upordown,
        is_correct: null,
        user_id: predictionData.user_id,
        stock_id: predictionData.stock_id,
        predictionstockID: stock.stock_id,
        predictionStockValue: stock.current_price,
      });

      return newPrediction;
    } catch (error) {
      console.error("서비스 오류:", error);
      throw error;
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
      console.error("서비스 오류:", error);
      throw new Error("사용자 예측을 가져오는 중 오류 발생");
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
        throw new Error("예측을 찾을 수 없습니다");
      }

      const isCorrect =
        (prediction.prediction_upordown === "UP" &&
          prediction.Stock.price_change > 0) ||
        (prediction.prediction_upordown === "DOWN" &&
          prediction.Stock.price_change < 0);

      await prediction.update({ is_correct: isCorrect });

      return prediction;
    } catch (error) {
      console.error("서비스 오류:", error);
      throw new Error("예측 확인 중 오류 발생");
    }
  },
};

module.exports = PredictionService;

// createPrediction 메서드 테스트
const testCreatePrediction = async () => {
  try {
    const result = await PredictionService.createPrediction({
      user_id: 1,
      stock_id: 1,
      prediction_upordown: "UP",
    });
    console.log("예측 생성됨:", result);
  } catch (error) {
    console.error("예측 생성 중 오류 발생:", error.message);
  }
};

testCreatePrediction();
