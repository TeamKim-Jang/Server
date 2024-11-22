// src/models/portfoliostockModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../db.js");

// Define the PortfolioStock model
const portfolioStock = sequelize.define(
  "portfolioStock",
  {
    portfoliostock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "portfoliostock",
    timestamps: false,
  }
);
portfolioStock.afterUpdate((portfolioStock) => {
  broadcastUpdate("PORTFOLIO_STOCK_UPDATE", portfolioStock);
});

module.exports = portfolioStock;
