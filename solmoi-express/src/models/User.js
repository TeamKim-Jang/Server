import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  total_sol_leaf: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default User;
