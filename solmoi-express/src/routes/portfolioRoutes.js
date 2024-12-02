import express from "express";
import PortfolioController from "../controllers/portfolioController.js";
const router = express.Router();

router.get("/:id", PortfolioController.getUserPortfolio);

export default router;
