import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

const {
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = process.env;

console.log({
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
});

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: 'db',
  port: MYSQL_PORT || 3306,
  dialect: 'mysql',
  logging: console.log,
});

let TestModel;

// DB 연결 함수 (재시도 로직 포함)
const dbConnect = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('DB 연결 성공');

      // 모델 생성
      TestModel = sequelize.define('TestModel', {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });

      await TestModel.sync({ force: true }); // 테스트 테이블 초기화
      console.log('테스트 테이블 생성');

      break;
    } catch (error) {
      console.error('DB 연결 실패:', error.message);
      console.error(`재시도 횟수: ${retries}`);
      retries -= 1;
      if (!retries) {
        console.error('최대 재시도 횟수 초과. 애플리케이션은 계속 실행');
        break;
      }
      console.log(`${delay / 1000}초 후 재시도...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

// Sequelize 연결 테스트
(async () => {
  try {
    const [results] = await sequelize.query('SELECT 1 + 1 AS solution');
    console.log('쿼리 결과:', results);
  } catch (err) {
    console.error('쿼리 실패:', err.message);
  }
})();

// 서버 초기화
(async () => {
  await dbConnect();

  // 테스트용 엔드포인트
  app.get('/', async (req, res) => {
    if (!TestModel) {
      return res.status(500).json({ message: 'TestModel이 초기화되지 않았습니다.' });
    }

    try {
      const newData = await TestModel.create({ name: 'Sequelize Test' });
      const allData = await TestModel.findAll();

      res.status(200).json({
        message: 'HelloHello',
        newData,
        allData,
      });
    } catch (err) {
      console.error('엔드포인트 처리 중 에러 발생:', err.message);
      res.status(500).json({ error: err.message });
    }
  });

  // 서버 실행
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
})();