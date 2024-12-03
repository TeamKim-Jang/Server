import express from 'express';
import schoolController from '../controllers/schoolController.js';

const router = express.Router();

// 검색 엔드포인트
router.get('/search', schoolController.search);

export default router;
