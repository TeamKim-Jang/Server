import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const School = sequelize.define('School', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

School.hasMany(User, { foreignKey: 'schoolId' });
User.belongsTo(School, { foreignKey: 'schoolId' });

export default School;
