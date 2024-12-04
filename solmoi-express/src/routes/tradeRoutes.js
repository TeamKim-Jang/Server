import express from "express";
import TradeController from "../controllers/tradeController.js";

const router = express.Router();

// 주식 매수
router.post("/buy", TradeController.buyStock);

// 주식 매도
router.post("/sell", TradeController.sellStock);

export default router;
