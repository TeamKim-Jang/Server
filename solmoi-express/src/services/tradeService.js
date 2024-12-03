import tradeRepository from "../repositories/tradeRepository.js";
import userRepository from "../repositories/userRepository.js";
import transactionRepository from "../repositories/transactionRepository.js";
import portfolioStockRepository from "../repositories/portfolioStockRepository.js";

class TradeService {
  async buyStock(userId, stockId, quantity) {
    const user = await userRepository.getUserById(userId);
    const stock = await tradeRepository.getStockById(stockId);

    if (!user || !stock) {
      throw new Error("유효하지 않은 사용자 또는 주식");
    }

    const totalCost = stock.currentPrice * quantity;

    if (user.cashBalance < totalCost) {
      throw new Error("잔액 부족");
    }

    await userRepository.updateCashBalance(userId, user.cashBalance - totalCost);

    const portfolioStock = await portfolioStockRepository.getPortfolioStock(userId, stockId);
    if (portfolioStock) {
      await portfolioStockRepository.updateStockQuantity(portfolioStock.id, portfolioStock.quantity + quantity);
    } else {
      await portfolioStockRepository.addStockToPortfolio(userId, stockId, quantity);
    }

    await transactionRepository.createTransaction(userId, stockId, "BUY", quantity, stock.currentPrice);

    return { success: true, message: "주식 매수 완료" };
  }

  async sellStock(userId, stockId, quantity) {
    const user = await userRepository.getUserById(userId);
    const stock = await tradeRepository.getStockById(stockId);

    if (!user || !stock) {
      throw new Error("유효하지 않은 사용자 또는 주식");
    }

    const portfolioStock = await portfolioStockRepository.getPortfolioStock(userId, stockId);
    if (!portfolioStock || portfolioStock.quantity < quantity) {
      throw new Error("보유 주식 수량 부족");
    }

    const totalSaleValue = stock.currentPrice * quantity;

    await userRepository.updateCashBalance(userId, user.cashBalance + totalSaleValue);

    if (portfolioStock.quantity === quantity) {
      await portfolioStockRepository.removeStockFromPortfolio(portfolioStock.id);
    } else {
      await portfolioStockRepository.updateStockQuantity(portfolioStock.id, portfolioStock.quantity - quantity);
    }

    await transactionRepository.createTransaction(userId, stockId, "SELL", quantity, stock.currentPrice);

    return { success: true, message: "주식 매도 완료" };
  }
}

export default new TradeService();
