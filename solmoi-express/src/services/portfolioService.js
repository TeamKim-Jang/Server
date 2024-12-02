import { Op } from "sequelize";
import { Stock, PortfolioStock } from "../models/index.js";

class PortfolioStockService {
  async getUserPortfolioStock(user_id) {
    try {
      // 데이터베이스에서 user_id에 해당하는 포트폴리오 스톡을 가져오기
      const userPortfolioStocks = await PortfolioStock.findAll({
        where: { user_id },
        attributes: ["portfoliostock_id", "user_id", "stock_id"],
      });

      if (userPortfolioStocks.length === 0) {
        return [];
      }

      // 사용자가 보유한 주식의 stock_id 목록 추출
      const stockIds = userPortfolioStocks.map((item) => item.stock_id);

      // Stock 모델에서 해당 stock_id에 해당하는 주식 정보 가져오기
      const stocksInfo = await Stock.findAll({
        where: {
          stock_id: {
            [Op.in]: stockIds,
          },
        },
        attributes: [
          "stock_id",
          "name",
          "symbol",
          "current_price",
          "price_change",
        ],
      });

      // 포트폴리오 정보와 주식 정보를 결합
      const combinedInfo = userPortfolioStocks.map((portfolioItem) => {
        const stockInfo = stocksInfo.find(
          (stock) => stock.stock_id === portfolioItem.stock_id
        );
        return {
          ...portfolioItem.toJSON(),
          ...stockInfo.toJSON(),
        };
      });
      return combinedInfo;
    } catch (error) {
      console.error("Error in getUserPortfolioStock:", error.message);
      throw new Error("Failed to fetch user portfolio stocks");
    }
  }
}

export default new PortfolioStockService();
