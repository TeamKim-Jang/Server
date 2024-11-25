import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Ranking = sequelize.define('Ranking', {
  ranking_id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  total_profit_loss: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

Ranking.belongsTo(User, { foreignKey: 'user_id' });

export default Ranking;
