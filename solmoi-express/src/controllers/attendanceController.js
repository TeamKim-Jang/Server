//controllers/attendanceController.js
import attendanceService from '../services/attendanceService.js';

const attendanceController = {
  // 이번 달 출석 횟수와 오늘 출석 여부 반환
  getAttendanceStatus: async (req, res) => {
    console.log('getAttendanceStatus called');
    try {
      const user = req.user;
      if(!user){
        return res.status(401).json({error: 'User not authenticated'});
      }
      const status = await attendanceService.getAttendanceStatus(user);
      res.status(200).json(status);
    } catch (error) {
      console.error('Error in fetching attendance status:', error.message);
      res.status(400).json({ error: error.message });
    }
  },

  // 오늘 출석 체크
  checkInAttendance: async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
      const result = await attendanceService.checkInAttendance(user);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in checking attendance:', error.message);
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};

export default attendanceController;