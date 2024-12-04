// 환경 변수 로드
import dotenv from 'dotenv';
dotenv.config();

// Sequelize 및 모델 가져오기
import sequelize from './config/db.js';
import { School } from './models/index.js';
import schoolService from './services/schoolService.js';

(async () => {
  try {
    // 데이터베이스 연결 테스트
    await sequelize.authenticate();
    console.log('DB 연결 성공');

    // 데이터 조회
    const schools = await School.findAll({ raw: true });
    console.log('학교 데이터 가져오기 완료:', schools);

    // 데이터 색인 (ElasticSearch와 연동)
    await schoolService.indexData(schools);
    console.log('Data indexed successfully');
  } catch (error) {
    console.error('Error during indexing:', error);
  } finally {
    // 연결 닫기
    await sequelize.close();
    console.log('DB 연결 종료');
  }
})();
