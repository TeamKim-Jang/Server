import { Sequelize } from 'sequelize';
import { School, Portfolio, User } from '../models/index.js';
import rankingRepository from '../repositories/rankingRepository.js';

class RankingService {
  async getOverallRanking() {
    try {
      return await rankingRepository.fetchOverallRankings();
    } catch (error) {
      console.error('Error in getOverallRanking:', error.message);
      throw new Error('Failed to fetch overall rankings');
    }
  }

  // 학교별
  async getSchoolRanking(schoolId) {
    try {
      return await rankingRepository.fetchSchoolRankings(schoolId);
    } catch (error) {
      console.error('Error in getSchoolRanking:', error.message);
      throw new Error('Failed to fetch school rankings');
    }
  }

  async updateSchoolAverage() {
    try {
      const schoolAverages = await Portfolio.findAll({
        attributes: [
          [Sequelize.col('User.school_id'), 'school_id'],
          [Sequelize.fn('AVG', Sequelize.col('total_profit_loss')), 'average_profit_loss'],
        ],
        include: {
          model: User,
          attributes: [],
        },
        group: ['User.school_id'],
      });

      for (const school of schoolAverages) {
        await School.update(
          { average_profit_loss: school.dataValues.average_profit_loss },
          { where: { school_id: school.dataValues.school_id } }
        );
      }

      console.log('School averages updated successfully');
    } catch (error) {
      console.error('Error updating school averages:', error.message);
      throw new Error('Failed to update school averages');
    }
  }

  async getSchoolAverageRanking(schoolId) {
    try {
      const schoolRankings = await School.findAll({
        attributes: ['school_id', 'school_name', 'average_profit_loss'],
        order: [['average_profit_loss', 'DESC']],
      });

      const userSchool = schoolRankings.find(
        (school) => school.school_id === parseInt(schoolId, 10)
      );

      if (!userSchool) throw new Error('User school not found');

      // 순위 계산
      const schoolRank = schoolRankings.findIndex(
        (school) => school.school_id === parseInt(schoolId, 10)
      ) + 1;

      return {
        school_name: userSchool.school_name,
        average_profit_loss: userSchool.average_profit_loss,
        rank: schoolRank,
      };
    } catch (error) {
      console.error('Error in getSchoolAverageRanking:', error.message);
      throw new Error('Failed to fetch school average rankings');
    }
  }
}

export default new RankingService();
