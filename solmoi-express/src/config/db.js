import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

// Sequelize 인스턴스 생성
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
});

// 연결 테스트
sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Sequelize를 사용하여 MySQL에 성공적으로 연결되었습니다.');
  })
  .catch((err) => {
    console.error('❌ Sequelize를 사용한 MySQL 연결 실패:', err.message);
  });

export default sequelize;
