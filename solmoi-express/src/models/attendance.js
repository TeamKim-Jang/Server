//models/attendance.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Attendance = sequelize.define('Attendance', {
    attendance_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sol_leaf_earned: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
  }, {
    tableName: 'Attendance',
    freezeTableName: true,
  });

export default Attendance;