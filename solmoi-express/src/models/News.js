import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const News = sequelize.define(
  'News',
  {
    news_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
    },
    content_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false, // createdAt, updatedAt 비활성화
    tableName: 'News', // 명시적으로 테이블 이름 지정
  }
);

export default News;
