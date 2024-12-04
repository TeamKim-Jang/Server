import express from "express";
import TradeController from "../controllers/tradeController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// 주식 매수
router.post("/buy", authMiddleware, TradeController.buyStock);

// 주식 매도
router.post("/sell", authMiddleware, TradeController.sellStock);

export default router;
