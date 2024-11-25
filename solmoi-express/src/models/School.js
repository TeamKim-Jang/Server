import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const School = sequelize.define('School', {
  school_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  school_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  average_profit_loss: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: null,
  }
}, {
  tableName: 'School',
});

export default School;
