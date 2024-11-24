import Ranking from '../models/Ranking.js';
import User from '../models/User.js';

class RankingService {
    async getOverallRanking() {
      try {
        const rankings = await Ranking.findAll({
          include: {
            model: User,
            attributes: ['nickname', 'school_id'], // 유저 정보 일부 포함
          },
          order: [['total_profit_loss', 'DESC']],
          limit: 100,
        });
        return rankings;
      } catch (error) {
        throw new Error('Failed to fetch overall rankings');
      }
    }

    //학교별
    async getSchoolRanking(schoolId) {
        try {
          const rankings = await Ranking.findAll({
            include: {
              model: User,
              where: { school_id: schoolId },
              attributes: ['nickname'],
            },
            order: [['total_profit_loss', 'DESC']],
            limit: 100,
          });
          return rankings;
        } catch (error) {
          throw new Error('Failed to fetch school rankings');
        }
    }

    //소속학교 순위
    async getSchoolAverageRanking() {
        try {
          const schoolRankings = await Ranking.findAll({
            attributes: [
              'school_id',
              [Sequelize.fn('AVG', Sequelize.col('total_profit_loss')), 'average_profit_loss'],
            ],
            include: {
              model: School,
              attributes: ['school_name'], // 학교이름
            },
            group: ['school_id'],
            order: [[Sequelize.literal('average_profit_loss'), 'DESC']],
          });
    
          return schoolRankings;
        } catch (error) {
          throw new Error('Failed to fetch school average rankings');
        }
      }
  }
  
  export default new RankingService();
