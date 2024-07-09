const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connection = require('./DB');
var sessionToken = [];
module.exports = sessionToken;

//indexTest 코드에서 login,register,checkData 함수 불러오기
const { accessMain } = require('./AccessModule');
const { mainPageOrder } = require('./MainPageOrder');
const { postsOrder } = require('./PostsOrder')


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
// 리소스 제공
app.use(express.static(path.join(__dirname, 'StartPoint')));


// 루트 경로에서 Login.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'StartPoint', 'Login.html'));
    
});



// 서버측에서 해당 코드들 진행
app.post('/execute',async (req,res) => {
    console.log("로그인페이지 요청 성공")
    console.log("세션 토큰 : ", sessionToken);
    const data = req.body;
    //const { functionType, ID, PW , Token } = req.body;
    const result = await accessMain(data)
    res.json(result);
});

app.get('/mainPageOrder', async (req,res) => {
    console.log("메인페이지 요청 성공")
    const query = req.query;
    
    const result = await mainPageOrder(query)
    res.json(result);
})

app.get('/NavigationOrder', async (req,res) => {
    console.log("인터페이스 요청 성공")
    res.sendFile(path.join(__dirname, 'StartPoint/NavigationBar', 'NavigationBar.html'));
})

app.post('/postsOrder', async (req, res) => {
    const data = req.body;
    console.log("게시물 페이지 요청 성공")

    const results = await postsOrder(data)
    res.json(results);
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
