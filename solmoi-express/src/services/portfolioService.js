import { Portfolio } from "../models/index.js";

class PortfolioService {
  async getUserPortfolio(user_id) {
    try {
      const portfolios = await Portfolio.findAll({ where: { user_id } });
      return portfolios;
    } catch (error) {
      console.error("Error in getUserPortfolio:", error.message);
      throw new Error("Failed to fetch user portfolio");
    }
  }

  async updatePortfolio(userId) {
    // 보유 주식 데이터
    const portfolioStocks = await portfolioStockRepository.getPortfolioStocksByUserId(userId);

    if (!portfolioStocks || portfolioStocks.length === 0) {
      throw new Error("사용자가 보유한 주식이 없습니다.");
    }

    let totalInvestment = 0;
    let totalProfitLoss = 0;

    // 보유 주식 실시간 주가 반영
    for (const stock of portfolioStocks) {
      const realTimeStock = await stockRepository.getStockById(stock.stock_id);

      if (!realTimeStock) {
        console.error(`Stock ID ${stock.stock_id} 데이터를 찾을 수 없습니다.`);
        continue;
      }

      const currentPrice = realTimeStock.current_price;
      const purchaseCost = stock.quantity * stock.purchase_price; // 매수 당시 총 금액
      const currentValue = stock.quantity * currentPrice; // 현재가

      totalInvestment += currentValue;//총투자금액
      totalProfitLoss += currentValue - purchaseCost;//총수익률
    }

    // 포트폴리오 업데이트
    await portfolioRepository.updatePortfolio(userId, {
      total_investment: totalInvestment,
      total_profit_loss: totalProfitLoss,
    });

    return { total_investment: totalInvestment, total_profit_loss: totalProfitLoss };
  }
}

export default new PortfolioService();
