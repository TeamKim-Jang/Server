// src/models/portfoliostockModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

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

export default portfolioStock;
