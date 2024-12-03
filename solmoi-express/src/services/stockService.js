import stockRepository from "../repositories/stockRepository.js";

class StockService {
  async getStockData(stockCode, startDate, endDate, periodType) {
    const stockData = await stockRepository.getStockPrices(stockCode, startDate, endDate, periodType);
  
    if (!stockData || stockData.length === 0) {
      throw new Error("No stock data available");
    }
  
    return stockData.map((item) => ({
      date: this.formatDate(item.date),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
  }
  
  formatDate(rawDate) {
    if (typeof rawDate === "string") {
      const year = rawDate.substring(0, 4);
      const month = rawDate.substring(4, 6);
      const day = rawDate.substring(6, 8);
      return `${year}-${month}-${day}`;
    }
    throw new Error("Invalid date format");
  }
}

export default new StockService();