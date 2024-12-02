<<<<<<< HEAD
import User from "./User.js";
import Portfolio from "./Portfolio.js";
import School from "./School.js";
import Ranking from "./Ranking.js";
import PortfolioStock from "./portfolioStockModel.js";
import Prediction from "./predictionModel.js";
import Stock from "./stockModel.js";

User.hasOne(Portfolio, { foreignKey: "user_id" });
Portfolio.belongsTo(User, { foreignKey: "user_id" });
=======
import User from './User.js';
import Portfolio from './Portfolio.js';
import School from './School.js';
import Ranking from './Ranking.js';
import News from './News.js';
import NewsRead from './NewsRead.js';
>>>>>>> a790a17cd44ee0e0978db1ee343924c6de5fb26f

School.hasMany(User, { foreignKey: "school_id" });
User.belongsTo(School, { foreignKey: "school_id" });

User.hasOne(Ranking, { foreignKey: "user_id" });
Ranking.belongsTo(User, { foreignKey: "user_id" });

// User and PortfolioStock association
User.hasMany(PortfolioStock, { foreignKey: "user_id" });
PortfolioStock.belongsTo(User, { foreignKey: "user_id" });

<<<<<<< HEAD
// Stock and PortfolioStock association
Stock.hasMany(PortfolioStock, { foreignKey: "stock_id" });
PortfolioStock.belongsTo(Stock, { foreignKey: "stock_id" });

// User and Prediction association
User.hasMany(Prediction, { foreignKey: "user_id" });
Prediction.belongsTo(User, { foreignKey: "user_id" });

// Stock and Prediction association
Stock.hasMany(Prediction, { foreignKey: "stock_id" });
Prediction.belongsTo(Stock, { foreignKey: "stock_id" });

export { User, Portfolio, School, Ranking, PortfolioStock, Prediction, Stock };
=======
export { User, Portfolio, School, Ranking, News, NewsRead };
>>>>>>> a790a17cd44ee0e0978db1ee343924c6de5fb26f
