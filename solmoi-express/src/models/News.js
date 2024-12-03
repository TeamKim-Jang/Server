import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const News = sequelize.define(
  'News',
  {
    news_id: {
      type: DataTypes.BIGINT,
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
    timestamps: false, 
    tableName: 'News',
  }
);

export default News;
