import TradeService from "./services/TradeService.js";

class TradeController {
  async buyStock(req, res) {
    try {
      const { userId, stockId, quantity } = req.body;
      const result = await TradeService.buyStock(userId, stockId, quantity);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async sellStock(req, res) {
    try {
      const { userId, stockId, quantity } = req.body;
      const result = await TradeService.sellStock(userId, stockId, quantity);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new TradeController();
