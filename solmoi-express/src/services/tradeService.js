import tradeRepository from "../repositories/tradeRepository.js";
import transactionRepository from "../repositories/transactionRepository.js";
import portfolioStockRepository from "../repositories/portfolioStockRepository.js";
import portfolioRepository from "../repositories/portfolioRepository.js";

class TradeService {
  async buyStock(userId, stockId, quantity) {
    const portfolio = await portfolioRepository.getPortfolioByUserId(userId);
    const stock = await tradeRepository.getStockById(stockId);

    if (!portfolio || !stock) {
      throw new Error("유효하지 않은 사용자 또는 주식");
    }

    const totalCost = stock.current_price * quantity;

    if (portfolio.cash_balance < totalCost) {
      throw new Error("잔액 부족");
    }

    // 잔고 업데이트
    await portfolioRepository.updateCashBalance(userId, portfolio.cash_balance - totalCost);

    const portfolioStock = await portfolioStockRepository.getPortfolioStock(userId, stockId);
    if (portfolioStock) {
      // 보유 중인 주식 -> 수량 업데이트
      const totalQuantity = portfolioStock.quantity + quantity;
      const newPurchasePrice = (portfolioStock.purchase_price * portfolioStock.quantity + stock.current_price * quantity) / totalQuantity;

      await portfolioStockRepository.updatePortfolioStock(portfolioStock.portfoliostock_id, {
        quantity: totalQuantity,
        purchase_price: newPurchasePrice,
      });
    } else {
      // new 주식 -> PortfolioStock에 추가
      await portfolioStockRepository.addStockToPortfolio(userId, stockId, quantity, stock.current_price);
    }

    // 내역 저장
    await transactionRepository.createTransaction(userId, stockId, "BUY", quantity, stock.current_price);

    await this.updatePortfolio(userId);

    return { success: true, message: "주식 매수 완료" };
  }

  async sellStock(userId, stockId, quantity) {
    const portfolio = await portfolioRepository.getPortfolioByUserId(userId);
    const stock = await tradeRepository.getStockById(stockId);

    if (!portfolio || !stock) {
      throw new Error("유효하지 않은 사용자 또는 주식");
    }

    const portfolioStock = await portfolioStockRepository.getPortfolioStock(userId, stockId);
    if (!portfolioStock || portfolioStock.quantity < quantity) {
      throw new Error("보유 주식 수량 부족");
    }

    const totalSaleValue = stock.current_price * quantity;

    // 잔고 업데이트
    await portfolioRepository.updateCashBalance(userId, portfolio.cash_balance + totalSaleValue);

    // PortfolioStock 업데이트
    if (portfolioStock.quantity === quantity) {
        await portfolioStockRepository.removeStockFromPortfolio(portfolioStock.portfoliostock_id);
    } else {
        const remainingQuantity = portfolioStock.quantity - quantity;
        await portfolioStockRepository.updateStockQuantity(portfolioStock.portfoliostock_id, remainingQuantity);
    }
      
    // 내역 저장
    await transactionRepository.createTransaction(userId, stockId, "SELL", quantity, stock.current_price);

    await this.updatePortfolio(userId);

    return { success: true, message: "주식 매도 완료" };
  }

  async updatePortfolio(userId) {
    const portfolioStocks = await portfolioStockRepository.getPortfolioStocksByUserId(userId);
  
    if (!portfolioStocks || portfolioStocks.length === 0) {
      await portfolioRepository.updatePortfolio(userId, {
        total_investment: 0,
        total_profit_loss: 0,
      });
      return;
    }
  
    let totalInvestment = 0;
    let totalProfitLoss = 0;
  
    for (const stock of portfolioStocks) {
      const realTimeStock = await tradeRepository.getStockById(stock.stock_id);
  
      if (!realTimeStock) {
        console.error(`Stock ID ${stock.stock_id} 데이터를 찾을 수 없습니다.`);
        continue;
      }
  
      const currentPrice = realTimeStock.current_price || 0;
      const purchasePrice = stock.purchase_price || 0;
      const quantity = stock.quantity || 0;
  
      const currentValue = quantity * currentPrice;
      const purchaseCost = quantity * purchasePrice;
  
      totalInvestment += currentValue;
      totalProfitLoss += currentValue - purchaseCost;
    }
  
    await portfolioRepository.updatePortfolio(userId, {
      total_investment: totalInvestment,
      total_profit_loss: totalProfitLoss,
    });
  }  
}

export default new TradeService();
