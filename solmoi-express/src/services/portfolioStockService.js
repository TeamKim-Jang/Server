const portfolioStock = require("../models/portfoliostockModel.js");

const PortfolioStockService = {
  getUserPortfolioStock: async (user_id) => {
    try {
      // 데이터베이스에서 user_id에 해당하는 포트폴리오 스톡을 가져오기
      const portfoliostock = await portfolioStock.findAll({
        where: { user_id },
        attributes: ["portfoliostock_id", "user_id", "stock_id"], // 반환할 컬럼 지정
      });
      return portfoliostock;
    } catch (error) {
      console.error("Service error:", error);
      // 사용자에게 명확한 에러 메시지를 전달
      throw new Error("Error fetching user portfolio");
    }
  },
};

module.exports = PortfolioStockService;
