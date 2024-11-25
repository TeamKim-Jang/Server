import mysql from 'mysql2';
import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();
// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST, // .env에 설정된 DB_HOST 사용
  user: process.env.DB_USER, // .env에 설정된 DB_USER 사용
  password: process.env.DB_PASSWORD, // .env에 설정된 DB_PASSWORD 사용
  database: process.env.DB_NAME, // .env에 설정된 DB_NAME 사용
  port: process.env.DB_PORT || 3306, // .env에 설정된 DB_PORT 사용 (기본값 3306)
});

// MySQL 연결 테스트
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL 연결 실패:', err.message);
  } else {
    console.log('✅ MySQL에 성공적으로 연결되었습니다.');
  }
});

export default db;
