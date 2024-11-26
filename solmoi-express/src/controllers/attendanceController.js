import attendanceService from '../services/attendanceService.js';

const attendanceController = {
  // 이번 달 출석 횟수와 오늘 출석 여부 반환
  getAttendanceStatus: async (req, res) => {
    console.log('getAttendanceStatus called');
    try {
      const userId = req.userId; // JWT 인증에서 가져온 사용자 ID
      const status = await attendanceService.getAttendanceStatus(userId);
      res.status(200).json(status);
    } catch (error) {
      console.error('Error in fetching attendance status:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // 오늘 출석 체크
  checkInAttendance: async (req, res) => {
    try {
      const userId = req.userId; // JWT 인증에서 가져온 사용자 ID
      const result = await attendanceService.checkInAttendance(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in checking attendance:', error.message);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

export default attendanceController;
