import Ranking from '../models/Ranking.js';
import User from '../models/User.js';
import School from '../models/School.js';
import Sequelize from 'sequelize';

class RankingRepository {
  async fetchOverallRankings() {
    return Ranking.findAll({
      include: {
        model: User,
        attributes: ['nickname', 'school_id'],
      },
      order: [['total_profit_loss', 'DESC']],
      limit: 100,
    });
  }

  async fetchSchoolRankings(schoolId) {
    return Ranking.findAll({
      include: {
        model: User,
        where: { school_id: schoolId },
        attributes: ['nickname'],
      },
      order: [['total_profit_loss', 'DESC']],
      limit: 100,
    });
  }

  async fetchSchoolAverageRankings() {
    return School.findAll({
      attributes: [
        'school_id',
        'school_name',
        [Sequelize.fn('AVG', Sequelize.col('Rankings.total_profit_loss')), 'average_profit_loss'],
      ],
      include: [
        {
          model: Ranking,
          attributes: [],
        },
      ],
      group: ['school_id', 'school_name'],
      order: [[Sequelize.literal('average_profit_loss'), 'DESC']],
    });
  }
}

export default new RankingRepository();
