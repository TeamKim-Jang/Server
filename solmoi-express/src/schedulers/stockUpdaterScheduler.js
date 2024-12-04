import schedule from "node-schedule";
import stockUpdaterService from "../services/stockUpdaterService.js";

const stockUpdaterScheduler = () => {
  schedule.scheduleJob("*/20 * * * *", async () => {
    try {
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

      console.log("스케줄러 실행 중: 실시간 주가 업데이트...");

      for (let i = 0; i < stockCodes.length; i++) {
        setTimeout(async () => {
          try {
            const stockCode = stockCodes[i];
            console.log(
              `Updating stock: ${stockCode.name} (${stockCode.code})`
            );
            await stockUpdaterService.updateStockPrices([stockCode]); // 주식 가격 업데이트
            await portfolioStockService.updatePortfolioStockPrices(); // 포트폴리오 가격 동기화
            console.log(`${stockCode.name} 업데이트 완료.`);
          } catch (error) {
            console.error(
              `Error updating stock: ${stockCodes[i].name}`,
              error.message
            );
          }
        }, i * 1000);
      }
    } catch (error) {
      console.error("스케줄러 실행 실패:", error.message);
    }
  });
};

export default stockUpdaterScheduler;
