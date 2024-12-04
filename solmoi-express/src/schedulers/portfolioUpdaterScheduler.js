import schedule from "node-schedule";
import PortfolioService from "../services/portfolioService.js";
import userRepository from "../repositories/userRepository.js";

const portfolioUpdaterScheduler = () => {
  schedule.scheduleJob("0 0 * * *", async () => {
    console.log("포트폴리오 업데이트 스케줄러 실행 중...");

    try {
      // 모든 유저 포트폴리오 업데이트
      const users = await userRepository.getAllUsers();
      for (const user of users) {
        console.log(`유저 포트폴리오 업데이트 중...`);
        await PortfolioService.updatePortfolio(user.user_id);
      }

      console.log("포트폴리오 업데이트 완료");
    } catch (error) {
      console.error("포트폴리오 업데이트 실패:", error.message);
    }
  });
};

export default portfolioUpdaterScheduler;
