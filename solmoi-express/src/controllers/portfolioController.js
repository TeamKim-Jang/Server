const PortfolioService = require("../services/portfolioService.js");

const PortfolioController = {
  getUserPortfolio: async (req, res) => {
    try {
      const user_id = req.params.id;
      const portfolios = await PortfolioService.getUserPortfolio(user_id);
      res.status(200).json({ success: true, data: portfolios });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to get portfolio" });
    }
  },
};

module.exports = PortfolioController;
