import stockRepository from "../repositories/stockRepository.js";
import Stock from "../models/Stock.js";

class StockUpdaterService {
    async updateStockPrices() {
        const stockCodes = [
          { code: "005930", name: "삼성전자" },
          { code: "000660", name: "SK하이닉스" },
          { code: "035420", name: "NAVER" },
          { code: "035720", name: "카카오" },
          { code: "005380", name: "현대차" },
          { code: "051910", name: "LG화학" },
          { code: "066570", name: "LG전자" },
          { code: "207940", name: "삼성바이오로직스" },
          { code: "105560", name: "KB금융" },
          { code: "015760", name: "한국전력" },
          { code: "017670", name: "SK텔레콤" },
          { code: "018260", name: "삼성에스디에스" },
          { code: "012330", name: "현대모비스" },
          { code: "090430", name: "아모레퍼시픽" },
          { code: "028260", name: "삼성물산" },
          { code: "006400", name: "삼성SDI" },
          { code: "009150", name: "삼성전기" },
          { code: "003550", name: "LG" },
          { code: "000270", name: "기아" },
          { code: "011200", name: "HMM" },
          { code: "001740", name: "SK네트웍스" },
          { code: "032830", name: "삼성생명" },
          { code: "000810", name: "삼성화재" },
          { code: "010950", name: "S-Oil" },
          { code: "005490", name: "POSCO홀딩스" },
          { code: "024110", name: "기업은행" },
          { code: "055550", name: "신한지주" },
          { code: "086790", name: "하나금융지주" },
          { code: "008560", name: "메리츠화재" },
          { code: "001450", name: "현대해상" },
        ];
      
        for (let i = 0; i < stockCodes.length; i++) {
          const { code, name } = stockCodes[i];
          setTimeout(async () => {
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
          }, i * 1000); 
        }
      }
      
}

export default new StockUpdaterService();