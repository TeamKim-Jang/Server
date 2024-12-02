import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const School = sequelize.define('School', {
    school_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'school',
    freezeTableName: true,
  });

export default School;