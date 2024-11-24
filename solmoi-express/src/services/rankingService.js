import Ranking from '../models/Ranking.js';

class RankingService {
  async getOverallRanking() {
    try {
      const rankings = await Ranking.findAll({
        order: [['profit', 'DESC']], // 수익금액 기준으로 내림차순
        limit: 100, // max 100명
      });
      return rankings;
    } catch (error) {
      throw new Error('Failed to fetch overall rankings');
    }
  }
}

export default new RankingService();
