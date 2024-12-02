import portfolioService from "../services/portfolioService.js";

class PortfolioController {
  async getUserPortfolio(req, res) {
    try {
      const user_id = req.params.id;
      const portfolios = await portfolioService.getUserPortfolio(user_id);
      res.status(200).json({ success: true, data: portfolios });
    } catch (error) {
      console.error("Error fetching user portfolio:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Failed to get portfolio" });
    }
  }
}

export default new PortfolioController();
