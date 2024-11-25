import express from 'express';
import cors from 'cors';
import newsRoutes from '../src/routes/news.js'
import newsapiRoutes from '../src/routes/newsapi.js'

const app = express();

// 미들웨어 CORS 설정
app.use(cors());
app.use(express.json()); // JSON 요청 파싱

//뉴스 routes
// app.use("/api/news",newsRoutes)
app.use("/api/news",newsapiRoutes)

// 서버 실행
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ 서버열림 ${PORT}`);
});
