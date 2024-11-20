const { DataTypes } = require("sequelize");
const sequelize = require("../../db.js");

// Define the Portfolio model
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
      primaryKey: false,
    },
    stock_id: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "portfolio_stock",
    timestamps: false,
  }
);

module.exports = portfolioStock;
