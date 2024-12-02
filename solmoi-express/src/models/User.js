  import { DataTypes } from 'sequelize';
  import sequelize from '../config/db.js';

  const User = sequelize.define(
    'User', // 모델 이름
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_name: {
        type: DataTypes.STRING(20),
      },
      nickname: {
        type: DataTypes.STRING(20),
      },
      birth_date: {
        type: DataTypes.STRING(200),
      },
      phone_number: {
        type: DataTypes.BIGINT,
      },
      email: {
        type: DataTypes.STRING(200),
      },
      password: {
        type: DataTypes.STRING(200),
      },
      total_sol_leaf: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      school_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      tableName: 'User', // 정확히 대문자로 시작하는 테이블 이름 지정
      timestamps: false, // createdAt, updatedAt 자동 생성 방지
    }
  );
  
  export default User;
