const express = require("express");
const http = require("http");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// API routes (import from separate route files)
const portfolioRoutes = require("./src/routes/portfolioRoutes");
const portfolioStockRoutes = require("./src/routes/portfolioStockRoutes");
const predictionRoutes = require("./src/routes/predictionRoutes");

app.use("/api/invest/main/balance", portfolioRoutes);
app.use("/api/invest/main/portfoliostock", portfolioStockRoutes);
app.use("/api/predict", predictionRoutes); // 새로운 예측 게임 라우트

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: err.message });
});

console.log("Server initialized without WebSocket functionality.");

module.exports = app;
