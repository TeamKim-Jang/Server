import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_ROOT_PASSWORD, MYSQL_DATABASE } = process.env;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
  host: 'localhost',
  port:MYSQL_PORT || 3306,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
