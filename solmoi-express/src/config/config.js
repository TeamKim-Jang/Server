import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET,
  db: {
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
  },
};
console.log('Database Config:', config.db)
export default config;
