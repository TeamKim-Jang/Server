import express from 'express';
import { News, NewsRead, User } from '../models/index.js';



const router = express.Router();

router.get('/invest/solleafcontent/news/:newsId', async (req, res) => {
  console.log('요청 수신:', req.params, req.query); // 디버깅용 로그 추가

  const { newsId } = req.params;
  const { user_id, read_date } = req.query;

  if (!user_id || !read_date) {
    return res.status(400).json({ error: '필수 필드 누락' });
  }

  try {
    // 1. User의 total_sol_leaf 조회
    const user = await User.findOne({
      where: { user_id },
      attributes: ['total_sol_leaf'],
    });

    if (!user) {
      console.log('🚫 User 찾을 수 없음:', user_id);
      return res.status(404).json({ message: 'User 찾을 수 없음' });
    }

    const totalSolLeaf = user.total_sol_leaf || 0;

    if (totalSolLeaf >= 10) {
      console.log(`🚫 총 솔잎이 ${totalSolLeaf}개로 지급이 중단됩니다.`);
      return res.status(200).json({ message: '오늘 총 솔잎 지급 중단!' });
    }

    // 2. NewsRead 테이블에서 읽은 기록 확인
    const newsRead = await NewsRead.findOne({
      where: { news_id: newsId, user_id, read_date },
    });

    if (newsRead) {
      console.log(`🚫 이미 읽은 뉴스: ${JSON.stringify(newsRead)}`);
      return res.status(200).json({ message: '오늘 읽은 뉴스입니다~', data: newsRead });
    }

    // 3. 읽기 기록 추가
    await NewsRead.create({ news_id: newsId, user_id, read_date });

    // 4. User의 total_sol_leaf 업데이트
    await User.update(
      { total_sol_leaf: totalSolLeaf + 1 },
      { where: { user_id } }
    );

    return res.status(201).json({
      message: '뉴스읽기 날짜 및 쏠잎 업데이트',
      data: {
        news_id: newsId,
        user_id,
        read_date,
      },
    });
  } catch (err) {
    console.error('❌ DB 오류:', err);
    return res.status(500).json({ error: '서버 오류 발생' });
  }
});

export default router;
