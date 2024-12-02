import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Portfolio = sequelize.define(
  "Portfolio",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    cash_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_investment: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total_profit_loss: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "Portfolio",
    timestamps: false,
  }
);

export default Portfolio;
