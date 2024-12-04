import TradeService from "../services/tradeService.js";

class TradeController {
    async buyStock(req, res) {
      try {
        const { stockId, quantity } = req.body;
  
        const userId = req.user.user_id;
        if (!userId) throw new Error("유효하지 않은 사용자입니다.");
  
        const result = await TradeService.buyStock(userId, stockId, quantity);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  
    async sellStock(req, res) {
      try {
        const { stockId, quantity } = req.body;
  
        const userId = req.user.user_id;
        if (!userId) throw new Error("유효하지 않은 사용자입니다.");
  
        const result = await TradeService.sellStock(userId, stockId, quantity);
        res.status(200).json(result);
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
    }
  }
  
  export default new TradeController();
  