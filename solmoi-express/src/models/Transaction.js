import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Transaction = sequelize.define(
  "Transaction",
  {
    transaction_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM("BUY", "SELL"), 
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    },
    transaction_date: {
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.BIGINT, 
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "Stock",
        key: "stock_id",
      },
    },
  },
  {
    tableName: "Transaction",
    timestamps: false, 
  }
);

export default Transaction;
