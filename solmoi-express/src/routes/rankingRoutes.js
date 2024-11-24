import express from 'express';
import rankingController from './controllers/rankingController.js';

const router = express.Router();

router.get('/rankings/overall', rankingController.getOverallRanking);

export default router;
