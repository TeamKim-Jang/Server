import { Stock } from "../models/index.js";

class StockRepository {
  async getStockById(stockId) {
    return await Stock.findByPk(stockId);
  }
}

export default new StockRepository();
