const express = require("express");
const PortfolioController = require("../controllers/portfolioController");
const router = express.Router();

router.get("/:id", PortfolioController.getUserPortfolio);

module.exports = router;
