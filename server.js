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
app.use(express.static(path.join(__dirname, 'StartPoint')));


// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'StartPoint', 'index.html'));
});


// 서버측에서 해당 코드들 진행
app.post('/execute',async (req,res) => {
    const { functionType, ID, PW , Token } = req.body;
    const result = await executeMain(functionType,ID,PW,Token)
    res.json(result);
    
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
