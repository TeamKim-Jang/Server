import express from 'express';
import attendanceController from '../controllers/attendanceController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// 이번 달 출석 횟수와 오늘 출석 여부 반환
router.get('/attendance', authMiddleware, attendanceController.getAttendanceStatus);

// 오늘 출석 체크
router.post('/attendance', authMiddleware, attendanceController.checkInAttendance);

export default router;
