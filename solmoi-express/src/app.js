import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const {
  PORT,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: 'db', // Docker Compose의 MySQL 서비스 이름
  port: MYSQL_PORT || 3306,
  dialect: 'mysql',
});

// DB 연결 함수 (재시도 로직 포함)
const dbConnect = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('DB 연결 성공');
      break; // 연결 성공 시 반복문 종료
    } catch (error) {
      console.error(`DB 연결 실패. 재시도 횟수: ${retries}`);
      console.error(error.message);
      retries -= 1;
      if (!retries) {
        console.error('최대 재시도 횟수 초과. 애플리케이션 종료.');
        process.exit(1); // 재시도 실패 시 프로세스 종료
      }
      console.log(`${delay / 1000}초 후 재시도...`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // 딜레이
    }
  }
};

// 서버 초기화
(async () => {
  // DB 연결 시도
  await dbConnect();

  // 테스트 모델 생성
  const TestModel = sequelize.define('TestModel', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  await TestModel.sync({ force: true }); // 테스트 테이블 초기화
  console.log('테스트 테이블 생성');

  // 테스트용 엔드포인트
  app.get('/', async (req, res) => {
    const newData = await TestModel.create({ name: 'Sequelize Test' });
    const allData = await TestModel.findAll();

    res.status(200).json({
      message: 'HelloHello',
      newData,
      allData,
    });
  });

  // 서버 실행
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
