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
  }
  
  export default new RankingService();
