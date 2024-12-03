import stockService from "../services/stockService.js";

class StockController {
  async getStockData(req, res) {
    const { stockCode } = req.params;
    const { duration } = req.query;

    console.log(`Fetching stock data for ${stockCode} with duration: ${duration}`);

    try {
      const now = new Date();
      let startDate, endDate;
      let periodType;

      endDate = now.toISOString().split("T")[0];

      switch (duration) {
        case "1D":
          periodType = "D"; 
          const oneDayAgo = new Date();
          oneDayAgo.setDate(now.getDate() - 1);
          startDate = oneDayAgo.toISOString().split("T")[0];
          break;
        case "1W":
          periodType = "W"; // 주봉
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(now.getDate() - 7);
          startDate = oneWeekAgo.toISOString().split("T")[0];
          break;
        case "1M":
          periodType = "M"; // 월봉
          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(now.getMonth() - 1);
          startDate = oneMonthAgo.toISOString().split("T")[0];
          break;
        case "3M":
          periodType = "M"; // 월봉
          const threeMonthsAgo = new Date();
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          startDate = threeMonthsAgo.toISOString().split("T")[0];
          break;
        case "6M":
          periodType = "M"; // 월봉
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(now.getMonth() - 6);
          startDate = sixMonthsAgo.toISOString().split("T")[0];
          break;
        default:
          return res.status(400).json({ error: "Invalid duration parameter" });
      }

      console.log(`Fetching data from ${startDate} to ${endDate} with periodType: ${periodType}`);

      // 주식 데이터 가져오기
      const stockData = await stockService.getStockData(stockCode, startDate, endDate, periodType);

      if (!stockData || stockData.length === 0) {
        return res.status(404).json({ error: "Stock data not found" });
      }

      console.log("Final Response Data:", stockData);
      res.json({ data: stockData });
    } catch (error) {
      console.error("Error in getStockData:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new StockController();
