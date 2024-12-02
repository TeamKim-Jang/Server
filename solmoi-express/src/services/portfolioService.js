import { Portfolio } from "../models/index.js";

class PortfolioService {
  async getUserPortfolio(user_id) {
    try {
      const portfolios = await Portfolio.findAll({ where: { user_id } });
      return portfolios;
    } catch (error) {
      console.error("Error in getUserPortfolio:", error.message);
      throw new Error("Failed to fetch user portfolio");
    }
  }
}

export default new PortfolioService();
