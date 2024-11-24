import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Ranking = sequelize.define('Ranking', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  
  export default Ranking;