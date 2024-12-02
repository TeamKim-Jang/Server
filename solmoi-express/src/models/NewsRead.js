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
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    read_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: 'NewsRead', // 테이블 이름 대소문자 정확히 지정
    timestamps: false, // createdAt, updatedAt 필드 비활성화
  }
);

export default NewsRead;
