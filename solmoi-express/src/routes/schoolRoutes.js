import express from 'express';
import schoolController from '../controllers/schoolController.js';

const router = express.Router();

router.get('/', schoolController.searchSchools);

export default router;
