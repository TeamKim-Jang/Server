import predictionService from "../services/predictionService.js";

class PredictionController {
  async getGameStatus(req, res) {
    try {
      const userId = req.params.userId; // 실제 환경에서는 인증 시스템에서 가져와야 함

      // 전날 예측 확인
      const yesterdayPrediction =
        await predictionService.getYesterdayPrediction(userId);

      // 오늘 예측 확인
      const todayPrediction =
        await predictionService.getTodayPrediction(userId);

      // 새로운 예측이 필요한 경우 랜덤 주식 선택
      let randomStock = null;
      if (!todayPrediction) {
        randomStock = await predictionService.getRandomStock();
      }

      res.status(200).json({
        success: true,
        data: {
          yesterdayPrediction,
          todayPrediction,
          randomStock,
        },
      });
    } catch (error) {
      console.error("Error fetching game status:", error.message);
      res.status(500).json({
        success: false,
        message: "게임 상태를 가져오는데 실패했습니다.",
      });
    }
  }

  async createPrediction(req, res) {
    try {
      const { userId, stockId, predictionUpOrDown } = req.body;

      const result = await predictionService.createPrediction(
        userId,
        stockId,
        predictionUpOrDown
      );

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating prediction:", error.message);
      res.status(500).json({
        success: false,
        message: "예측 생성에 실패했습니다.",
      });
    }
  }
}

export default new PredictionController();
