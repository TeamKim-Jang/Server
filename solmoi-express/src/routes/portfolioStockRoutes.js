import express from "express";
import PortfolioStockController from "../controllers/portfolioStockController.js";
const router = express.Router();

router.get("/:id", PortfolioStockController.getUserPortfolioStock);

export default router;
