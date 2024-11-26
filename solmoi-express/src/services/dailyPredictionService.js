const { Op } = require("sequelize");
const Prediction = require("../models/predictionModel.js");
const Stock = require("../models/stockModel.js");

const DailyPredictionService = {
  updatePredictionResults: async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    try {
      const predictions = await Prediction.findAll({
        where: {
          prediction_date: yesterday,
          is_correct: null,
        },
        include: [
          {
            model: Stock,
            attributes: ["current_price", "price_change"],
          },
        ],
      });

      for (const prediction of predictions) {
        const isCorrect =
          (prediction.prediction_upordown === "UP" &&
            prediction.Stock.price_change > 0) ||
          (prediction.prediction_upordown === "DOWN" &&
            prediction.Stock.price_change < 0);

        await prediction.update({ is_correct: isCorrect });
      }

      console.log(`어제의 ${predictions.length}개 예측을 업데이트했습니다.`);
    } catch (error) {
      console.error("예측 결과 업데이트 중 오류 발생:", error);
    }
  },

  selectRandomStock: async () => {
    try {
      const randomStock = await Stock.findOne({
        order: sequelize.random(),
        attributes: ["stock_id", "current_price"],
      });

      if (!randomStock) {
        throw new Error("사용 가능한 주식이 없습니다");
      }

      console.log(
        `오늘의 랜덤 주식 선택: ID ${randomStock.stock_id}, 가격 ${randomStock.current_price}`
      );

      return randomStock;
    } catch (error) {
      console.error("랜덤 주식 선택 중 오류 발생:", error);
    }
  },

  runDailyTasks: async () => {
    await DailyPredictionService.updatePredictionResults();
    await DailyPredictionService.selectRandomStock();
  },
};

module.exports = DailyPredictionService;

// 테스트를 위해 일일 작업을 즉시 실행
DailyPredictionService.runDailyTasks();

// 프로덕션 환경에서는 스케줄러를 설정하여 매일 실행하도록 합니다
// 예시 (주석 처리됨):
// const cron = require('node-cron');
// cron.schedule('0 0 * * *', () => {
//   DailyPredictionService.runDailyTasks();
// });
