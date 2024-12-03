import express from 'express';
import axios from 'axios';
import cron from 'node-cron';
import { News, NewsRead, User } from '../models/index.js';
import { Op } from 'sequelize';

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
  try {
    await News.findOrCreate({
      where: { news_id },
      defaults: { title, thumbnail_url, content_url },
    });
    console.log(`✅ 저장된 기사 ID: ${news_id}`);
  } catch (err) {
    console.error(`❌ 저장 실패 (ID: ${news_id}):`, err.message);
    throw err;
  }
};

// **크롤링 함수**
const fetchAndStoreNews = async () => {
  try {
    console.log('🛠️ 크롤링 시작');
    const totalPages = 4;
    const pageSize = 100;

    // 기존 데이터 삭제
    await News.destroy({ where: {} });
    console.log('✅ 기존 데이터 삭제 완료');

    for (let page = 1; page <= totalPages; page++) {
      console.log(`📄 페이지 ${page} 데이터 가져오는 중...`);

      const response = await axios.get('https://api-v2.deepsearch.com/v1/articles', {
        params: {
          symbols: 'KRX:055550,KRX:005380,KRX:035420,KRX:000660,KRX:005930',
          order: 'published_at',
          date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          date_to: new Date().toISOString().split('T')[0],
          page_size: pageSize,
          page: page,
          api_key: API_KEY,
        },
      });

      const articles = response.data.data;
      console.log(`✅ 페이지 ${page}에서 ${articles.length}개의 기사 가져옴`);

      if (!articles || articles.length === 0) continue;

      for (const article of articles) {
        const { id, title, thumbnail_url, content_url } = article;

        if (!id || !title || !thumbnail_url || !content_url) {
          console.warn(`🚨 필드 누락 기사: ${JSON.stringify(article)}`);
          continue;
        }

        await saveNewsToDB(id, title, thumbnail_url, content_url);
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

  const keywordConditions = Object.values(keywordsToNames)
    .flat()
    .map((keyword) => ({ title: { [Op.like]: `%${keyword}%` } }));

  try {
    const results = await News.findAll({
      where: { [Op.or]: keywordConditions },
      // order: [['created_at', 'DESC']],
      limit: 50,
    });

    res.status(200).json({ status: 'success', data: results });
  } catch (err) {
    console.error('❌ 뉴스 조회 오류:', err.message);
    res.status(500).json({ status: 'error', message: 'DB 조회 실패', error: err.message });
  }
});

// **뉴스 읽기 및 업데이트**
router.get('/invest/solleafcontent/news/:newsId', async (req, res) => {
  const { newsId } = req.params;
  const { user_id, read_date } = req.query;

  if (!user_id || !read_date) {
    return res.status(400).json({ error: '필수 필드 누락' });
  }

  try {
    // 1. 오늘 읽은 뉴스 수 확인
    const dailyCount = await NewsRead.count({
      where: { user_id, read_date },
    });

    console.log(`ℹ️ 현재 사용자의 오늘 읽은 뉴스 개수: ${dailyCount+1}`);

    if (dailyCount >= 10) {
      console.log(`🚫 오늘 읽은 뉴스가 ${dailyCount}개로 제한 초과.`);
      return res.status(200).json({ message: '오늘 쏠잎 지급 중단!' });
    }

    // 2. 이미 읽은 뉴스인지 확인
    const existingRecord = await NewsRead.findOne({
      where: { news_id: newsId, user_id, read_date },
    });

    if (existingRecord) {
      console.log(`🚫 이미 읽은 뉴스: ${JSON.stringify(existingRecord)}`);
      return res.status(200).json({ message: '오늘 읽은 뉴스입니다~', data: existingRecord });
    }

    // 3. 읽기 기록 추가
    await NewsRead.create({ news_id: newsId, user_id, read_date });

    // 4. User의 total_sol_leaf 업데이트
    await User.increment('total_sol_leaf', { where: { user_id } });

    res.status(201).json({
      message: '뉴스읽기 기록 저장 및 쏠잎 지급 완료',
      data: { news_id: newsId, user_id, read_date },
    });
  } catch (err) {
    console.error('❌ DB 오류:', err.message);
    res.status(500).json({ error: '서버 오류 발생' });
  }
});

export default router;