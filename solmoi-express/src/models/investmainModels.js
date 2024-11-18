const mysql = require("mysql2/promise");

// 데이터베이스 연결 설정
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "00000000",
  database: "yourDatabase",
});

// 모든 투자 정보 가져오기
exports.getAllInvestments = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM investments");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
};

pool
  .getConnection()
  .then(() => {
    console.log("Connected to the MySQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the MySQL database:", err);
  });

// 투자 추가
exports.addInvestment = async (investmentData) => {
  try {
    const { name, amount } = investmentData;
    const [result] = await pool.query(
      "INSERT INTO investments (name, amount) VALUES (?, ?)",
      [name, amount]
    );
    return { id: result.insertId, name, amount };
  } catch (err) {
    throw err;
  }
};
