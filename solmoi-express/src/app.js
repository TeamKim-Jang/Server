import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import portfolioStockRoutes from "./routes/portfolioStockRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import attendanceRoutes from "./routes/attendanceRoutes.js";
import newsapiRoutes from '../src/routes/newsapi.js'

import { User, Portfolio, School, Ranking } from "./models/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const initializeDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB 연결 성공");

    await sequelize.sync({ force: false });
    console.log("모델 동기화완료");
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
app.use("/api/news",newsapiRoutes);

const startServer = async () => {
  await initializeDB();
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
};

startServer();
