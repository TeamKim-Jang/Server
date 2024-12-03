import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Ranking = sequelize.define('Ranking', {
    ranking_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "User",
        key: "user_id",
      },
    },
    total_profit_loss: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'Ranking',
  });


export default Ranking;
