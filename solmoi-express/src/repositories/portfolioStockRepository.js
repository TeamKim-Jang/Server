import { PortfolioStock } from "../models/index.js";

class PortfolioStockRepository {
  async getPortfolioStock(userId, stockId) {
    return await PortfolioStock.findOne({ where: { user_id: userId, stock_id: stockId } });
  }

  async updateStockQuantity(portfolioStockId, newQuantity) {
    return await PortfolioStock.update({ quantity: newQuantity }, { where: { portfolio_stock_id: portfolioStockId } });
  }

  async addStockToPortfolio(userId, stockId, quantity) {
    return await PortfolioStock.create({ user_id: userId, stock_id: stockId, quantity });
  }

  async removeStockFromPortfolio(portfolioStockId) {
    return await PortfolioStock.destroy({ where: { portfolio_stock_id: portfolioStockId } });
  }
}

export default new PortfolioStockRepository();
