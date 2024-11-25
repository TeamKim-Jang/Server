import { User, Attendance } from '../models/user.js';
import { Op } from 'sequelize';

const attendanceService = {
  getAttendanceStatus: async (userId) => {
    const today = new Date().toISOString().slice(0, 10); // 오늘 날짜 ('YYYY-MM-DD')
    const firstDayOfMonth = new Date(today.slice(0, 7) + '-01'); // 이번 달 첫날

    const monthlyAttendanceCount = await Attendance.count({
      where: {
        user_id: userId,
        attendance_date: {
          [Op.gte]: firstDayOfMonth,
          [Op.lte]: today,
        },
      },
    });

    const hasCheckInToday = await Attendance.findOne({
      where: {
        user_id: userId,
        attendance_date: today,
      },
    });

    return {
      monthlyAttendanceCount,
      hasCheckInToday: !!hasCheckInToday,
    };
  },

  checkInAttendance: async (userId) => {
    try {
      const today = new Date().toISOString().slice(0, 10); // 오늘 날짜 ('YYYY-MM-DD')

      const [attendance, created] = await Attendance.findOrCreate({
        where: {
          user_id: userId,
          attendance_date: today,
        },
        defaults: {
          sol_leaf_earned: 10, // 기본 보상
        },
      });

      if (!created) {
        return { message: 'Already checked in today', sol_leaf_earned: 0 };
      }

      const user = await User.findByPk(userId);
      if (user) {
        user.total_sol_leaf += 10; // 기본 보상
        await user.save();
      }

      return {
        message: 'Attendance checked in successfully',
        sol_leaf_earned: 10,
      };
    } catch (error) {
      console.error('Error during attendance check:', error.message);
      throw new Error('Failed to check attendance');
    }
  },
};

export default attendanceService;
