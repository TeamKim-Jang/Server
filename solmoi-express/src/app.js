<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import portfolioStockRoutes from "./routes/portfolioStockRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";

import { User, Portfolio, School, Ranking } from "./models/index.js";
=======
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/db.js';
import rankingRoutes from './routes/rankingRoutes.js';
import { User, Portfolio, School, Ranking } from './models/index.js';
import newsRoutes from '../src/routes/news.js'
import newsapiRoutes from '../src/routes/newsapi.js'
>>>>>>> a790a17cd44ee0e0978db1ee343924c6de5fb26f

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

<<<<<<< HEAD
app.use("/api/ranking", rankingRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/prediction", predictionRoutes);
app.use("/api/portfolioStock", portfolioStockRoutes);
=======
app.use('/api/ranking', rankingRoutes);
app.use("/api/news",newsapiRoutes)
>>>>>>> a790a17cd44ee0e0978db1ee343924c6de5fb26f

const startServer = async () => {
  await initializeDB();
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
};

startServer();