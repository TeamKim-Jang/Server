import rankingService from '../services/rankingService.js';

class RankingController {
  async getOverallRanking(req, res) {
    try {
      const rankings = await rankingService.getOverallRanking();
      res.status(200).json({ data: rankings });
    } catch (error) {
      console.error('Error fetching overall rankings:', error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new RankingController();
