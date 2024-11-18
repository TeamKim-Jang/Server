const mysql = require("mysql2/promise");

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "00000000",
  database: "yourDatabase",
});

pool
  .getConnection()
  .then(() => {
    console.log("Connected to the MySQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the MySQL database:", err);
  });

// 모든 투자 정보 가져오기
exports.getAllInvestments = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM portfolio");
    return rows;
  } catch (err) {
    throw err;
  }
};
