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

  //학교별 
  async getSchoolRanking(schoolId) {
    try {
      return await rankingRepository.fetchSchoolRankings(schoolId);
    } catch (error) {
      console.error('Error in getSchoolRanking:', error.message);
      throw new Error('Failed to fetch school rankings');
    }
  }

  async getSchoolAverageRanking() {
    try {
      return await rankingRepository.fetchSchoolAverageRankings();
    } catch (error) {
      console.error('Error in getSchoolAverageRanking:', error.message);
      throw new Error('Failed to fetch school average rankings');
    }
  }
}

export default new RankingService();
