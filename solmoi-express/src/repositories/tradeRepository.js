import { Stock } from "../models/index.js";

class TradeRepository {
  async getStockById(stockId) {
    return await Stock.findByPk(stockId);
  }
}

export default new TradeRepository();
