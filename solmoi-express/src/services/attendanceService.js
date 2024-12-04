//services/attendanceService.js
import { User, Attendance } from '../models/index.js';
import { Op } from 'sequelize';

const attendanceService = {
  getAttendanceStatus: async (user) => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);


    const monthlyAttendanceCount = await Attendance.count({
      where: {
        user_id: user.user_id,
        attendance_date: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfToday,
        },
      },
    });

    const hasCheckInToday = await Attendance.findOne({
      where: {
        user_id: user.user_id,
        attendance_date: {
          [Op.gte]: today.setHours(0, 0, 0, 0),
          [Op.lte]: today.setHours(23, 59, 59, 999),
        },
      },
    });

    console.log('이달의 출석 횟수:', monthlyAttendanceCount);
    console.log('오늘 출첵 여부:', !!hasCheckInToday);

    return {
      monthlyAttendanceCount,
      hasCheckInToday: !!hasCheckInToday,
    };
  },

  checkInAttendance: async (user) => {
    try {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

      const existingAttendance = await Attendance.findOne({
        where: {
          user_id: user.user_id,
          attendance_date: {
            [Op.gte]: startOfToday,
            [Op.lte]: endOfToday,
          },
        },
      });

      if (existingAttendance) {
        const error = new Error('이미 오늘 출석 체크를 완료하셨습니다.');
        error.statusCode = 400;
        throw error;
      }

      // 새로운 출석 체크 생성
      const attendance = await Attendance.create({
        user_id: user.user_id,
        attendance_date: new Date(),
        sol_leaf_earned: 10,
      });

      // 유저의 총 포인트 업데이트
      if (user) {
        user.total_sol_leaf += 10;
        await user.save();
      } else {
        throw new Error('User not found while updating total_sol_leaf');
      }

      return {
        message: '출석 체크 완료!',
        sol_leaf_earned: 10,
      };
    } catch (error) {
      console.error('Error during attendance check:', error.message);
      throw error;
    }
  },
};

export default attendanceService;
