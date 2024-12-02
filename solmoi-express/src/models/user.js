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
});

const School = sequelize.define('School', {
  school_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Attendance = sequelize.define('Attendance', {
  attendance_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sol_leaf_earned: {
    type: DataTypes.BIGINT,
    allowNull:true,
    defaultValue: 0
  }
});

// 1대다 관계 설정
User.belongsTo(School, { foreignKey: 'school_id' }); // User 테이블에 shcool_id 외래키 생성
Attendance.belongsTo(User, { foreignKey: 'user_id' }); // Attendance 테이블에 user_id 외래키 생성

export { User, School, Attendance };
