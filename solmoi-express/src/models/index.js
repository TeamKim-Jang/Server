//models/index.js
import User from "./User.js";
import Portfolio from "./Portfolio.js";
import School from "./School.js";
import Ranking from "./Ranking.js";
import PortfolioStock from "./PortfolioStock.js";
import Prediction from "./Prediction.js";
import Stock from "./Stock.js";
import News from "./News.js";
import NewsRead from "./NewsRead.js";
import Transaction from "./Transaction.js";
import Attendance from "./Attendance.js";
import RewardHistory from "./RewardHistory.js"; 

// User와 Portfolio (1:1)
User.hasOne(Portfolio, { foreignKey: "user_id" });
Portfolio.belongsTo(User, { foreignKey: "user_id" });

// School과 User (1:N)
School.hasMany(User, { foreignKey: "school_id" });
User.belongsTo(School, { foreignKey: "school_id" });

// User와 Ranking (1:N)
User.hasMany(Ranking, { foreignKey: "user_id" });
Ranking.belongsTo(User, { foreignKey: "user_id" });

// User와 Attendance (1:N)
User.hasMany(Attendance, { foreignKey: "user_id" });
Attendance.belongsTo(User, { foreignKey: "user_id" });

// User와 PortfolioStock (1:N)
User.hasMany(PortfolioStock, { foreignKey: "user_id" });
PortfolioStock.belongsTo(User, { foreignKey: "user_id" });

// Stock과 PortfolioStock (1:N)
Stock.hasMany(PortfolioStock, { foreignKey: "stock_id" });
PortfolioStock.belongsTo(Stock, { foreignKey: "stock_id" });

// User와 Prediction (1:N)
User.hasMany(Prediction, { foreignKey: "user_id" });
Prediction.belongsTo(User, { foreignKey: "user_id" });

// Stock과 Prediction (1:N)
Stock.hasMany(Prediction, { foreignKey: "stock_id" });
Prediction.belongsTo(Stock, { foreignKey: "stock_id" });

// News와 NewsRead (1:N)
News.hasMany(NewsRead, { foreignKey: "news_id" });
NewsRead.belongsTo(News, { foreignKey: "news_id" });

// User와 NewsRead (1:N)
User.hasMany(NewsRead, { foreignKey: "user_id" });
NewsRead.belongsTo(User, { foreignKey: "user_id" });

// User와 Transaction (1:N)
User.hasMany(Transaction, { foreignKey: "user_id" });
Transaction.belongsTo(User, { foreignKey: "user_id" });

// Stock과 Transaction (1:N)
Stock.hasMany(Transaction, { foreignKey: "stock_id" });
Transaction.belongsTo(Stock, { foreignKey: "stock_id" });

// User와 RewardHistory (1:N)
User.hasMany(RewardHistory, { foreignKey: "user_id" });
RewardHistory.belongsTo(User, { foreignKey: "user_id" }); // 관계 추가

export {
  User,
  Portfolio,
  School,
  Ranking,
  PortfolioStock,
  Prediction,
  Stock,
  News,
  NewsRead,
  Transaction,
  Attendance,
  RewardHistory, 
};
