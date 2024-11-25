const PortfolioStockService = require("../services/portfolioStockService.js");

const PortfolioStockController = {
  getUserPortfolioStock: async (req, res) => {
    try {
      const user_id = req.params.id;
      const portfoliostock =
        await PortfolioStockService.getUserPortfolioStock(user_id);
      res.status(200).json({ success: true, data: portfoliostock });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get portfolioStock" });
    }
  },
};

module.exports = PortfolioStockController;
