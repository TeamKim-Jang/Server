import schedule from "node-schedule";
import stockUpdaterService from "../services/stockUpdaterService.js";

const stockUpdaterScheduler = () => {
  schedule.scheduleJob("*/1 * * * *", async () => {
    try {
      const stockCodes = [
        { code: "005930", name: "삼성전자" },
        { code: "000660", name: "SK하이닉스" },
        { code: "035420", name: "NAVER" },
      ];
      console.log("스케줄러 실행 중: 실시간 주가 업데이트...");
      await stockUpdaterService.updateStockPrices(stockCodes);
    } catch (error) {
      console.error("스케줄러 실행 실패:", error.message);
    }
  });
};

export default stockUpdaterScheduler;

