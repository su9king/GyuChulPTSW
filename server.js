const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connection = require('./DB');
var sessionToken = [];
module.exports = sessionToken;

//indexTest 코드에서 login,register,checkData 함수 불러오기
const { accessMain } = require('./accessModule');
const { mainPageOrder } = require('./mainPageOrder');



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
    console.log(sessionToken);
    const { functionType, ID, PW , Token } = req.body;
    const result = await accessMain(functionType,ID,PW,Token)
    res.json(result);

    
});

app.get('/mainPageOrder', async (req,res) => {
    console.log("GET요청 성공")
    const query = req.query;
    
    const result = await mainPageOrder(query)
    console.log(result)
    res.json(result);
})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
