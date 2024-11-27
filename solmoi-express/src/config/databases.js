import { Sequelize } from 'sequelize';
import config from './config.js';

console.log('Sequelize Config:', config.db);

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: config.db.dialect || 'mysql',
  }
);

export default sequelize;
