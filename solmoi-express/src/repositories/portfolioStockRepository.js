import { PortfolioStock } from "../models/index.js";

class PortfolioStockRepository {

  async getPortfolioStocksByUserId(userId) {
    return await PortfolioStock.findAll({ where: { user_id: userId } });
  }

  async getPortfolioStock(userId, stockId) {
    return await PortfolioStock.findOne({ where: { user_id: userId, stock_id: stockId } });
  }

  async updateStockQuantity(userId, stockId, newQuantity) {
    return await PortfolioStock.update(
      { quantity: newQuantity },
      { where: { user_id: userId, stock_id: stockId } }
    );
  }
  
   async addStockToPortfolio(userId, stockId, quantity, purchasePrice) {
    return await PortfolioStock.create({
        user_id: userId,
        stock_id: stockId,
        quantity,
        purchase_price: purchasePrice,
    });
  }

  async updatePortfolioStock(portfolioStockId, updatedData) {
    return await PortfolioStock.update(updatedData, { where: { portfoliostock_id: portfolioStockId } });
  }
  
  async removeStockFromPortfolio(portfolioStockId) {
    return await PortfolioStock.destroy({ where: { portfolio_stock_id: portfolioStockId } });
  }
}

export default new PortfolioStockRepository();
