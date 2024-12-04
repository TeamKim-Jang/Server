import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RewardHistory = sequelize.define("RewardHistory", {
  reward_id: { // 필드명 변경
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  reward_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  draw_date: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },
});

export default RewardHistory;
