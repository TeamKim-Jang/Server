import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import portfolioStockRoutes from "./routes/portfolioStockRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import schoolRoutes from "./routes/schoolRoutes.js";
import schoolService from "./services/schoolService.js";
import { User, Portfolio, School, Ranking } from "./models/index.js";
import newsapiRoutes from "./routes/newsapi.js";
import stockRoutes from "./routes/stockRoutes.js";
import stockRepository from "./repositories/stockRepository.js";
import stockUpdaterScheduler from "./schedulers/stockUpdaterScheduler.js";
import tradeRoutes from "./routes/tradeRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공");

    await sequelize.sync({ force: false }); // force: true는 테이블 초기화
    console.log("모델 동기화 완료");
  } catch (error) {
    console.error("DB 초기화 실패:", error.message);
    process.exit(1);
  }
};

app.use("/api/ranking", rankingRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/portfolioStock", portfolioStockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/news", newsapiRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/trade", tradeRoutes);

(async () => {
  try {
    await stockRepository.fetchAccessToken(process.env.APP_KEY, process.env.APP_SECRET);
    console.log("Access Token 초기화 성공");
  } catch (error) {
    console.error("Access Token 초기화 실패:", error.message);
  }
})();

const startServer = async () => {
  await initializeDB();
  // 주가 업데이트
  stockUpdaterScheduler();
  // Trie 초기화
  await schoolService.initializeTrie();

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
};
startServer();
