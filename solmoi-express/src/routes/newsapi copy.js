  import express from 'express';
  import axios from 'axios';
  import db from '../config/db.js'; // DB 연결
  import cron from 'node-cron';

  const router = express.Router();
  const API_KEY = process.env.NEWS_API_KEY; // .env 파일에서 API 키 로드

  // **자동 크롤링 작업** (매시간 정각 실행)
  cron.schedule('0 * * * *', async () => {
    console.log('⏰ 자동 크롤링 작업 시작');
    try {
      await fetchAndStoreNews();
      console.log('✅ 자동 크롤링 작업 완료');
    } catch (error) {
      console.error('❌ 자동 크롤링 작업 실패:', error.message);
    }
  });

  // **뉴스 저장 함수**
  const saveNewsToDB = async (news_id, title, thumbnail_url, content_url) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT IGNORE INTO Solemoi.News (news_id, title, thumbnail_url, content_url)
        VALUES (?, ?, ?, ?, ?)
      `;
      db.query(query, [news_id, title, thumbnail_url, content_url], (err, results) => {
        if (err) {
          console.error('❌ DB 삽입 오류:', err.message);
          return reject(err);
        }
        resolve(results);
      });
    });
  };

  const fetchAndStoreNews = async () => {
    try {
      console.log('🛠️ 크롤링 시작');
      const totalPages = 4; // 크롤링할 총 페이지 수
      const pageSize = 100; // 한 페이지당 기사 수
  
      // 데이터 삭제
      await new Promise((resolve, reject) => {
        const deleteQuery = `DELETE FROM Solemoi.News`;
        db.query(deleteQuery, (err) => {
          if (err) {
            console.error('❌ 기존 데이터 삭제 실패:', err.message);
            return reject(err);
          }
          console.log('✅ 기존 데이터 삭제 완료');
          resolve();
        });
      });
  
      for (let page = 1; page <= totalPages; page++) {
        console.log(`📄 페이지 ${page} 데이터 가져오는 중...`);
  
        // 페이지별 요청
        const response = await axios.get('https://api-v2.deepsearch.com/v1/articles', {
          params: {
            symbols: 'KRX:055550,KRX:005380,KRX:035420,KRX:000660,KRX:005930',
            order: 'published_at',
            date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 24시간 전 데이터
            date_to: new Date().toISOString().split('T')[0],
            page_size: pageSize,
            page: page, // 페이지 파라미터
            api_key: API_KEY,
          },
        });
  
        const articles = response.data.data;
        console.log(`✅ 페이지 ${page}에서 ${articles.length}개의 기사 가져옴`);
  
        if (!articles || articles.length === 0) {
          console.log('🚫 페이지에 데이터가 없습니다.');
          continue;
        }
  
        // 데이터 저장
        for (const article of articles) {
          const { id, title, thumbnail_url, content_url } = article;
  
          if (!id || !title || !thumbnail_url || !content_url) {
            console.warn(`🚨 필드 누락 기사: ${JSON.stringify(article)}`);
            continue;
          }
  
          try {
            await saveNewsToDB(id, title, thumbnail_url, content_url);
            console.log(`✅ 저장된 기사 ID: ${id}`);
          } catch (err) {
            console.error(`❌ 저장 실패 (ID: ${id}):`, err.message);
          }
        }
      }
  
      console.log('✅ 모든 기사 저장 완료');
    } catch (error) {
      console.error('❌ 크롤링 실패:', error.message);
      throw error;
    }
  };
  



  // **크롤링 트리거**
  router.post('/crawl', async (req, res) => {
    try {
      await fetchAndStoreNews();
      res.status(200).json({ status: 'success', message: '뉴스 크롤링 완료' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: '크롤링 실패', error: error.message });
    }
  });

  // **뉴스 조회** - 키워드 기반 필터링 추가
  router.get('/', async (req, res) => {
    const keywordsToNames = {
      신한지주: ['신한지주'],
      현대차: ['현대차', '현대자동차'],
      네이버: ['네이버'],
      SK하이닉스: ['SK하이닉스', '하이닉스'],
      삼성전자: ['삼성전자', '삼성'],
    };

    // SQL 조건 생성: 키워드를 LIKE로 검색
    const keywordConditions = Object.values(keywordsToNames)
      .flat() // 모든 키워드 배열을 하나로 병합
      .map((keyword) => `title LIKE '%${keyword}%'`) // 각 키워드에 LIKE 조건 추가
      .join(' OR '); // 조건들을 OR로 연결

    const query = `
      SELECT news_id, title, thumbnail_url, content_url
      FROM Solemoi.News
      WHERE ${keywordConditions} -- 키워드 조건 추가
      ORDER BY created_at DESC
      LIMIT 50
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('❌ 뉴스 조회 오류:', err.message);
        return res.status(500).json({ status: 'error', message: 'DB 조회 실패', error: err.message });
      }
      res.status(200).json({ status: 'success', data: results });
    });
  });


  // **뉴스 읽기 및 업데이트**
  router.get('/invest/solleafcontent/news/:newsId', (req, res) => {
    console.log('요청 수신:', req.params, req.query);

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
                read_date,
              },
            });
          });
        });
      });
    });
  });

  export default router;
