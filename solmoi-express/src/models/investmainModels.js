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
    const [rows] = await pool.query("SELECT * FROM investment");
    console.log(rows);
    return rows;
  } catch (err) {
    throw err;
  }
};
async function checkConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the MySQL database");

    // 연결된 DB 정보 출력
    console.log("Connection Info: ", connection.config);

    connection.release(); // 연결 풀에서 연결을 반환
  } catch (err) {
    console.error("Unable to connect to the MySQL database:", err);
  }
}

// 투자 추가
exports.addInvestment = async (investmentData) => {
  try {
    const { name, amount } = investmentData;
    const [result] = await pool.query(
      "INSERT INTO investment (name, amount) VALUES (?, ?)",
      [name, amount]
    );
    return { id: result.insertId, name, amount };
  } catch (err) {
    throw err;
  }
};

// 연결 확인 함수 호출
checkConnection();
