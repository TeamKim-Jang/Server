const Portfolio = require("../models/portfolioModel.js");

const PortfolioService = {
  getUserPortfolio: async (user_id) => {
    try {
      const portfolios = await Portfolio.findAll({ where: { user_id } });
      return portfolios;
    } catch (error) {
      console.error("Service error:", error);
      throw new Error("Error fetching user portfolio");
    }
  },
};

module.exports = PortfolioService;
