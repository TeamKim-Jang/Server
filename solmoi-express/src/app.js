import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import rankingRoutes from './routes/rankingRoutes.js';
import { User, Portfolio, School, Ranking } from './models/index.js';
import newsRoutes from '../src/routes/news.js'
import newsapiRoutes from '../src/routes/newsapi.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB 연결 성공');

    await sequelize.sync({ force: false });
    console.log('모델 동기화완료');
  } catch (error) {
    console.error('DB 초기화 실패:', error.message);
    process.exit(1);
  }
};

app.use('/api/ranking', rankingRoutes);
app.use("/api/news",newsapiRoutes)

const startServer = async () => {
  await initializeDB();
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};

startServer();