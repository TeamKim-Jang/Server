const { DataTypes } = require("sequelize");
const sequelize = require("../../db.js");

// Define the Portfolio model
const Portfolio = sequelize.define(
  "portfolio",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    cash_balance: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    total_investment: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    total_profit_loss: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "portfolio",
    timestamps: false,
  }
);
Portfolio.afterUpdate((portfolio) => {
  broadcastUpdate("PORTFOLIO_UPDATE", portfolio);
});

module.exports = Portfolio;
