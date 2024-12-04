import schoolService from '../services/schoolService.js';

const searchSchools = async (req, res) => {
  console.log("컨트롤러 호출됨:", req.query);
  const { query } = req.query;
  if (!query) {
      return res.status(400).json({ error: '검색어를 입력하세요.' });
  }

  try {
      const results = schoolService.search(query);
      console.log("검색 결과:", results);
      res.json(results);
  } catch (error) {
      console.error('Error searching schools:', error.message);
      res.status(500).json({ error: '학교 검색 중 오류가 발생했습니다.' });
  }
};

export default { searchSchools };
