const express = require("express");
const PortfolioStockController = require("../controllers/portfolioStockController");
const router = express.Router();

router.get("/:id", PortfolioStockController.getUserPortfolioStock);

module.exports = router;
