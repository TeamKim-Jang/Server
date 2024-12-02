// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname:{
    type: DataTypes.STRING,
    allowNull: false,

  },
  birth_date:{
    type:DataTypes.DATE,
    allowNull:false,
  },
  phone_number: {
    type:DataTypes.STRING,
    allowNull:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  total_sol_leaf: {
    type: DataTypes.BIGINT,
    allowNull:true,
    defaultValue: 0
  }
}, {
  tableName: 'user',
  freezeTableName: true,
});

export default User;