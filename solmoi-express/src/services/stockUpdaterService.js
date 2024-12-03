import stockRepository from "../repositories/stockRepository.js";
import Stock from "../models/Stock.js";

class StockUpdaterService {
    async updateStockPrices() {
        const stockCodes = [
          { code: "005930", name: "삼성전자" },
          { code: "000660", name: "SK하이닉스" },
          { code: "035420", name: "NAVER" },
        ];
      
        for (const { code, name } of stockCodes) {
          try {
            const now = new Date();
            const startDate = new Date(now);
            startDate.setDate(startDate.getDate() - 1);
            const endDate = now.toISOString().split("T")[0];
            const startDateStr = startDate.toISOString().split("T")[0];
      
            const stockData = await stockRepository.getStockPrices(
              code,
              startDateStr,
              endDate,
              "D"
            );
      
            for (const item of stockData) {
              await Stock.upsert({
                stock_id: code,
                name: name,
                symbol: code,
                current_price: item.close,
                price_change: item.close - item.open,
              });
            }
      
            console.log(`${name} (${code}) 주가 업데이트 완료`);
          } catch (error) {
            console.error(`Error updating stock prices for ${code}:`, error.message);
          }
        }
      }      
}

export default new StockUpdaterService();