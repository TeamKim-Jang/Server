import express from 'express';
import cors from 'cors'; // CORS 모듈 가져오기
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/databases.js';

const app = express();

// CORS 설정 추가
app.use(cors({
    origin: "http://localhost:5173", // React 앱이 실행 중인 주소
    credentials: true, // 인증 정보(쿠키 등) 허용
}));

// JSON 요청 처리
app.use(express.json());

// Sequelize 데이터베이스 연결
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch((error) => console.error('Database connection failed:', error));

// 라우터 등록
app.use('/auth', authRoutes);

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
