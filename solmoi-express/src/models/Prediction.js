import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Stock from "./Stock.js";

const Prediction = sequelize.define(
  "Prediction",
  {
    prediction_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    prediction_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prediction_upordown: {
      type: DataTypes.ENUM("UP", "DOWN"),
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    prediction_stock_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "Prediction",
    timestamps: false,
  }
);

Prediction.belongsTo(Stock, { foreignKey: "stock_id" });

export default Prediction;
