import allStockService from "../services/allstockService.js";

class AllStockController {
  async getAllStocks(req, res) {
    try {
      const stocks = await allStockService.getAllStocks(); // 모든 주식 데이터 가져오기
      res.json({ data: stocks });
    } catch (error) {
      console.error("Error in getAllStocks:", error.message);
      res.status(500).json({ error: "Failed to fetch all stocks" });
    }
  }
}

export default new AllStockController();
