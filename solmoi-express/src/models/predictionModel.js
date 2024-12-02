import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Stock from "./stockModel.js"; // Import Stock model

// Define the Prediction model
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
      allowNull: true, // Can be null until the prediction is verified
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users", // References the user table
        key: "id",
      },
    },
    stock_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "stock", // References the stock table
        key: "stock_id",
      },
    },
    prediction_stock_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "prediction",
    timestamps: false,
  }
);

// Define association with Stock model
Prediction.belongsTo(Stock, { foreignKey: "stock_id" });

export default Prediction;
