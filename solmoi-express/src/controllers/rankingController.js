import rankingService from '../services/rankingService.js';

class RankingController {
    //전체랭킹 조회
    async getOverallRanking(req, res) {
      try {
        const rankings = await rankingService.getOverallRanking();
        res.status(200).json({ data: rankings });
      } catch (error) {
        console.error('Error fetching overall rankings:', error.message);
        res.status(500).json({ error: error.message });
      }
    }

    //학교별 랭킹
    async getSchoolRanking(req, res) {
        const { schoolId } = req.params;
    
        try {
          const rankings = await rankingService.getSchoolRanking(schoolId);
          res.status(200).json({ data: rankings });
        } catch (error) {
          console.error('Error fetching school rankings:', error.message);
          res.status(500).json({ error: error.message });
        }
      }

    //소속학교 랭킹
    async getSchoolAverageRanking(req, res) {
        const { schoolId } = req.params; 

        try {
            const rankingData = await rankingService.getSchoolAverageRanking(schoolId);
            res.status(200).json({ data: rankingData });
        } catch (error) {
            console.error('Error fetching school average rankings:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
  }
  
  export default new RankingController();
