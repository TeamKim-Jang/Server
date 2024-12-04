import express from "express";
import allStockController from "../controllers/allStockController.js";

const router = express.Router();

router.get("/", (req, res) => allStockController.getAllStocks(req, res));

export default router;
