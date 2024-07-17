// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '172.30.1.3', // 데이터베이스 호스트
  user: 'root',      // 데이터베이스 사용자
  password: 'abc12345', // 데이터베이스 비밀번호
  database: 'mydatabase', // 데이터베이스 이름
  port : 3306
});

connection.connect((err) => {
  if (err) {
    console.error('데이터베이스 연결 실패:', err.stack);
    return;
  }
  console.log('데이터베이스에 연결되었습니다. 연결 ID:', connection.threadId);
});

module.exports = connection;