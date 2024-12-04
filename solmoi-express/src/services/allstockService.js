import { Op } from "sequelize";
import { Stock } from "../models/index.js";

class AllStockService {
  async getAllStocks() {
    try {
      const stocksInfo = await Stock.findAll({
        attributes: [
          "stock_id",
          "name",
          "symbol",
          "current_price",
          "price_change",
        ],
      });
      console.log(stocksInfo);
      return stocksInfo; // 주식 데이터 반환
      // 포트폴리오 + 주식 데이터
    } catch (error) {
      console.error("Error in getAllStocks:", error.message);
      throw new Error("Failed to fetch all stocks");
    }
  }
}

export default new AllStockService();
