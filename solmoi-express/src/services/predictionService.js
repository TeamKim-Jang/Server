import { Op } from "sequelize";
import { Prediction, Stock } from "../models/index.js";
import cron from "node-cron";

class PredictionService {
  // 사용자의 전날 예측 확인
  async getYesterdayPrediction(userId) {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const prediction = await Prediction.findOne({
        where: {
          user_id: userId,
          prediction_date: yesterday,
        },
        include: [
          {
            model: Stock,
            attributes: ["name", "symbol", "current_price"],
          },
        ],
      });

      return prediction;
    } catch (error) {
      console.error("Error in getYesterdayPrediction:", error);
      throw error;
    }
  }

  // 오늘의 예측 확인
  async getTodayPrediction(userId) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const prediction = await Prediction.findOne({
        where: {
          user_id: userId,
          prediction_date: today,
        },
        include: [
          {
            model: Stock,
            attributes: ["name", "symbol", "current_price"],
          },
        ],
      });

      return prediction;
    } catch (error) {
      console.error("Error in getTodayPrediction:", error);
      throw error;
    }
  }

  // 랜덤 주식 선택
  async getRandomStock() {
    try {
      const stock = await Stock.findOne({
        order: Stock.sequelize.random(),
        attributes: ["stock_id", "name", "symbol", "current_price"],
      });

      return stock;
    } catch (error) {
      console.error("Error in getRandomStock:", error);
      throw error;
    }
  }

  // 예측 생성
  async createPrediction(userId, stockId, predictionUpOrDown) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 오늘 이미 예측했는지 확인
      const existingPrediction = await Prediction.findOne({
        where: {
          user_id: userId,
          prediction_date: today,
        },
      });

      if (existingPrediction) {
        return {
          success: false,
          message: "이미 오늘의 예측을 하셨습니다.",
          data: existingPrediction,
        };
      }

      // 현재 주식 가격 가져오기
      const stock = await Stock.findByPk(stockId);

      const prediction = await Prediction.create({
        user_id: userId,
        stock_id: stockId,
        prediction_date: today,
        prediction_upordown: predictionUpOrDown,
        prediction_stock_value: stock.current_price,
      });

      return {
        success: true,
        message: "예측이 성공적으로 생성되었습니다.",
        data: prediction,
      };
    } catch (error) {
      console.error("Error in createPrediction:", error);
      throw error;
    }
  }

  // 24시간마다 예측 결과 업데이트 (크론 작업)
  async updatePredictionResults() {
    try {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);

      const predictions = await Prediction.findAll({
        where: {
          prediction_date: yesterday,
          is_correct: null,
        },
        include: [
          {
            model: Stock,
            attributes: ["current_price"],
          },
        ],
      });

      for (const prediction of predictions) {
        const currentPrice = prediction.Stock.current_price;
        const predictionPrice = prediction.prediction_stock_value;

        const priceIncreased = currentPrice > predictionPrice;
        const isCorrect =
          (prediction.prediction_upordown === "UP" && priceIncreased) ||
          (prediction.prediction_upordown === "DOWN" && !priceIncreased);

        await prediction.update({ is_correct: isCorrect });
      }

      return { success: true, message: "예측 결과가 업데이트되었습니다." };
    } catch (error) {
      console.error("Error in updatePredictionResults:", error);
      throw error;
    }
  }
}

const predictionService = new PredictionService();

// 매일 자정에 예측 결과 업데이트
cron.schedule("0 0 * * *", async () => {
  try {
    await predictionService.updatePredictionResults();
    console.log("Daily prediction results updated successfully");
  } catch (error) {
    console.error("Error updating daily prediction results:", error);
  }
});

export default predictionService;
