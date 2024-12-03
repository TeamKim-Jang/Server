import { Portfolio } from "../models/index.js";

class PortfolioRepository {
  async getPortfolioByUserId(userId) {
    return await Portfolio.findOne({ where: { user_id: userId } });
  }

  async updateCashBalance(userId, newBalance) {
    return await Portfolio.update({ cash_balance: newBalance }, { where: { user_id: userId } });
  }

  async updatePortfolio(userId, { total_investment, total_profit_loss }) {
    return await Portfolio.update(
      { total_investment, total_profit_loss },
      { where: { user_id: userId } }
    );
  }
}

export default new PortfolioRepository();
