import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Stock = sequelize.define(
  "Stock",
  {
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    symbol: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    current_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price_change: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Stock",
    timestamps: false,
  }
);

export default Stock;
