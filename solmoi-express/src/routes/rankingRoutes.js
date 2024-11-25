import express from 'express';
import rankingController from '../controllers/rankingController.js';

const router = express.Router();

router.get('/rankings/overall', rankingController.getOverallRanking);
router.get('/rankings/school/:schoolId', rankingController.getSchoolRanking);


export default router;
