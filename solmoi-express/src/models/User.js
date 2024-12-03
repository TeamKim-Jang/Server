  import { DataTypes } from 'sequelize';
  import sequelize from '../config/db.js';

  const User = sequelize.define(
    'User',
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      tableName: 'User',
      timestamps: false,
    }
  );
  
  export default User;
