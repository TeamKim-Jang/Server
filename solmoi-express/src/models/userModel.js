const { DataTypes } = require("sequelize");
const sequelize = require("../../db.js");

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
