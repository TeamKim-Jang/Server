import portfolioStockService from "../services/portfolioStockService.js";

class PortfolioStockController {
  async getUserPortfolioStock(req, res) {
    try {
      const user_id = req.params.id;
      const portfoliostock =
        await portfolioStockService.getUserPortfolioStock(user_id);
      res.status(200).json({ success: true, data: portfoliostock });
    } catch (error) {
      console.error("Error fetching user portfolio stock:", error.message);
      res
        .status(500)
        .json({ success: false, message: "Failed to get portfolioStock" });
    }
  }
}

export default new PortfolioStockController();
