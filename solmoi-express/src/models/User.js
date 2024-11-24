import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Ranking from './Ranking.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nickname: { type: DataTypes.STRING, allowNull: false },
  schoolId: { type: DataTypes.INTEGER },
});

User.hasOne(Ranking, { foreignKey: 'userId' });
Ranking.belongsTo(User, { foreignKey: 'userId' });

export default User;
