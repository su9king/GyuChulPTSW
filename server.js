const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

//indexTest 코드에서 login,register,checkData 함수 불러오기
//const { login, register, checkData } = require('./indexTest');
const { indexByJS } = require('./indexByJS');



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
app.post('/login', (req, res) => {
    
    const { ID, PW } = req.body;
    console.log(login(ID, PW));
    res.send(login(ID, PW));
    
});

app.post('/register', (req, res) => {
    const { ID, PW } = req.body;
    console.log("server.js에서 실행");
    indexByJS(req, res);
    res.send("서버사이드 측 콘솔 결과 : register 호출");
});

app.post('/checkData', (req, res) => {
    
    checkData();
    res.send("서버사이드 측 콘솔 결과 : checkData 호출");
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
