import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const NewsRead = sequelize.define(
  'NewsRead',
  {
    newsread_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    news_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "News", 
        key: "news_id",
      },
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "User", 
        key: "user_id",
      },
    },
    
    read_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: 'NewsRead', 
    timestamps: false,
  }
);

export default NewsRead;
