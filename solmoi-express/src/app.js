import express from 'express';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const { MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Sequelize 설정
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: 'db',
  port: MYSQL_PORT || 3306,
  dialect: 'mysql',
  logging: false,
});

let TestModel;

// DB 연결 &초기화
const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB 연결 성공');

    TestModel = sequelize.define('TestModel', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    await TestModel.sync({ force: true });
    console.log('테스트 테이블 생성');
  } catch (error) {
    console.error('DB 초기화 실패:', error.message);
    process.exit(1);
  }
};

// 테스트용 엔드포인트
app.get('/', async (req, res) => {
  try {
    const newData = await TestModel.create({ name: 'Sequelize Test' });
    const allData = await TestModel.findAll();
    res.status(200).json({ message: 'HelloHello', newData, allData });
  } catch (err) {
    console.error('엔드포인트 처리 중 에러 발생:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 서버 시작
const startServer = async () => {
  await initializeDB();
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};

startServer();
