import express from 'express';
import stockController from '../controllers/stockController.js';

const router = express.Router();

router.get("/:stockCode", (req, res) => stockController.getStockData(req, res));

export default router;