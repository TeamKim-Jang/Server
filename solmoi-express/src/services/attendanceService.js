import { User, Attendance } from '../models/user.js';
import Sequelize, { Op } from 'sequelize';

const attendanceService = {
  getAttendanceStatus: async (userId) => {
    const today = new Date();
    // 이번 달의 첫 날과 오늘의 끝 시간 설정
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    console.log('Start of Month:', startOfMonth);
    console.log('End of Today:', endOfToday);

    const monthlyAttendanceCount = await Attendance.count({
      where: {
        user_id: userId,
        attendance_date: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfToday,
        },
      },
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const hasCheckInToday = await Attendance.findOne({
      where: {
        user_id: userId,
        attendance_date: {
          [Op.gte]: startOfToday,
          [Op.lte]: endOfToday,
        },
      },
    });

    console.log('Monthly Attendance Count:', monthlyAttendanceCount);
    console.log('Has Check-In Today:', !!hasCheckInToday);

    return {
      monthlyAttendanceCount,
      hasCheckInToday: !!hasCheckInToday,
    };
  },

  checkInAttendance: async (userId) => {
    try {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      // 이미 오늘 출석 체크를 했는지 확인
      const existingAttendance = await Attendance.findOne({
        where: {
          user_id: userId,
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
        user_id: userId,
        attendance_date: new Date(), // 현재 날짜와 시간 저장
        sol_leaf_earned: 10, // 기본 보상
      });

      // 유저의 총 솔리프 업데이트
      const user = await User.findByPk(userId);
      if (user) {
        user.total_sol_leaf += 10;
        await user.save();
      }

      return {
        message: '출석 체크 완료!',
        sol_leaf_earned: 10,
      };
    } catch (error) {
      console.error('Error during attendance check:', error.message);
      throw error; // 원본 에러를 다시 던짐
    }
  },
  
};

export default attendanceService;
