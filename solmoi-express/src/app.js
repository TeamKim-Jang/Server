import express from 'express';
import cors from 'cors'; // CORS 모듈 가져오기
import authRoutes from './routes/authRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js'
import sequelize from './config/databases.js';

const app = express();

// CORS 설정 추가
app.use(cors({
    origin: "http://localhost:5173", // React 앱이 실행 중인 주소
    credentials: true, // 인증 정보(쿠키 등) 허용
}));
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// JSON 요청 처리
app.use(express.json());

// Sequelize 데이터베이스 연결
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection failed:', error));

// 라우터 등록
app.use('/auth', authRoutes);
app.use('/attendance', attendanceRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
=======
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import rankingRoutes from './routes/rankingRoutes.js';
import { User, Portfolio, School, Ranking } from './models/index.js';

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

const startServer = async () => {
  await initializeDB();
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
};

startServer();

