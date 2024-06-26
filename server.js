const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connection = require('./DB');

//indexTest 코드에서 login,register,checkData 함수 불러오기
const { executeMain } = require('./indexByChul');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
// 리소스 제공
app.use(express.static(path.join(__dirname, 'Startpoint')));
app.use(express.static(path.join(__dirname, 'Minchul')));
app.use(express.static(path.join(__dirname, 'Gyuho')));


// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Startpoint', 'index.html'));
});


// 서버측에서 해당 코드들 진행
app.post('/execute',async (req,res) => {
    const { functionType, ID, PW } = req.body;
    const result = await executeMain(functionType,ID,PW)
    res.json(result);
    // connection.query('SELECT * FROM users', (error, results, fields) => {
    //     if (error) {
    //       console.error('쿼리 실행 실패:', error.stack);
    //       res.status(500).send('서버 오류');
    //       return;
    //     }
    //     res.json(results);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
