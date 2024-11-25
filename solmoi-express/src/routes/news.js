import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/invest/solleafcontent/news/:newsId', (req, res) => {
  console.log('요청 수신:', req.params, req.query); // 디버깅용 로그 추가

  const { newsId } = req.params;
  const { user_id, read_date } = req.query;

  if (!user_id || !read_date) {
    return res.status(400).json({ error: '필수 필드 누락' });
  }

  const queryUserSolLeaf = `
    SELECT total_sol_leaf
    FROM User
    WHERE user_id = ?
  `;

  db.query(queryUserSolLeaf, [user_id], (err, userResults) => {
    if (err) {
      console.error('❌ User 조회 오류:', err);
      return res.status(500).json({ error: 'DB 오류' });
    }

    if (!userResults.length) {
      console.log('🚫 User 찾을 수 없음:', user_id);
      return res.status(404).json({ message: 'User 찾을 수 없음' });
    }

    const totalSolLeaf = userResults[0]?.total_sol_leaf || 0;

    if (totalSolLeaf >= 10) {
      console.log(`🚫 총 솔잎이 ${totalSolLeaf}개로 지급이 중단됩니다.`);
      return res.status(200).json({ message: '오늘 총 솔잎 지급 중단!' });
    }

    const queryCheck = `
      SELECT * FROM Solemoi.NewsRead
      WHERE news_id = ? AND user_id = ? AND read_date = ?
    `;

    db.query(queryCheck, [newsId, user_id, read_date], (err, results) => {
      if (err) {
        console.error('❌ 조회 오류:', err);
        return res.status(500).json({ error: 'DB 오류' });
      }

      if (results.length > 0) {
        console.log(`🚫 이미 읽은 뉴스: ${JSON.stringify(results[0])}`);
        return res.status(200).json({ message: '오늘 읽은 뉴스입니다~', data: results[0] });
      }

      const queryInsert = `
        INSERT INTO Solemoi.NewsRead (news_id, user_id, read_date)
        VALUES (?, ?, ?)
      `;
      db.query(queryInsert, [newsId, user_id, read_date], (err, result) => {
        if (err) {
          console.error('❌ 읽기 기록 추가 오류:', err);
          return res.status(500).json({ error: 'DB 오류' });
        }

        const queryUpdateUser = `
          UPDATE User
          SET total_sol_leaf = total_sol_leaf + 1
          WHERE user_id = ?
        `;

        db.query(queryUpdateUser, [user_id], (err, updateResult) => {
          if (err) {
            console.error('❌ User 업데이트 오류:', err);
            return res.status(500).json({ error: '쏠잎 지급 실패' });
          }

          res.status(201).json({
            message: '뉴스읽기 날짜 및 쏠잎 업데이트',
            data: {
              news_id: newsId,
              user_id,
              read_date, // 수정된 부분
            },
          });
        });
      });
    });
  });
});

export default router;
