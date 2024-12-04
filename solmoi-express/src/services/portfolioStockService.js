import { Op } from "sequelize";
import { Stock, PortfolioStock } from "../models/index.js";

class portfolioStockService {
  async getUserPortfolioStock(user_id) {
    try {
      const userPortfolioStocks = await PortfolioStock.findAll({
        where: { user_id },
        attributes: ["portfoliostock_id", "user_id", "stock_id"],
      });

      if (userPortfolioStocks.length === 0) {
        return [];
      }

      const stockIds = userPortfolioStocks.map((item) => item.stock_id);

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

      // 포트폴리오 + 주식 데이터
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

  async updatePortfolioStockPrices() {
    try {
      const portfolioStocks = await PortfolioStock.findAll();

      for (const portfolioStock of portfolioStocks) {
        const stock = await stockRepository.getStockById(
          portfolioStock.stock_id
        );
        if (stock) {
          // 현재가로 포트폴리오 업데이트
          portfolioStock.current_price = stock.current_price;
          await portfolioStock.save();
        }
      }
    } catch (error) {
      console.error("Failed to update portfolio stock prices:", error.message);
    }
  }
}

export default new portfolioStockService();
