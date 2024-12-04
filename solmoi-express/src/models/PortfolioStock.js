import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const PortfolioStock = sequelize.define(
  "PortfolioStock",
  {
    portfoliostock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Stock",
        key: "stock_id",
      },
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    purchase_price: {
      type: DataTypes.FLOAT, 
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "PortfolioStock",
    timestamps: false,
  }
);

export default PortfolioStock;
