import express from 'express';
import rankingController from '../controllers/rankingController.js';

const router = express.Router();

router.get('/overall', rankingController.getOverallRanking);
router.get('/school/:schoolId', rankingController.getSchoolRanking);
router.get('/schoolRank', rankingController.getSchoolAverageRanking);

export default router;
