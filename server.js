const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connection = require('./DB');
const bodyParser = require('body-parser');
var sessionToken = [];
module.exports = sessionToken;

//GyuChul 이 제작한 모듈 불러오기
const { accessMain } = require('./AccessModule');
const { mainPageOrder } = require('./MainPageOrder');
const { postsOrder } = require('./PostsOrder');
const { createGroupOrder } = require('./creageGroupOrder');
const { memberPageOrder } = require('./memberPageOrder.js');
const { schedulePageOrder } = require('./SchedulePageOrder');
require('./chatting')(server);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

app.get('/SideBarOrder', async (req,res) => {
    console.log("인터페이스 요청 성공")
    res.sendFile(path.join(__dirname, 'StartPoint/NavigationBar', 'SideBar.html'));
})

app.post('/postsOrder', async (req, res) => {
    const data = req.body;
    console.log("게시물 페이지 요청 성공")

    const results = await postsOrder(data)
    res.json(results);
});

app.post('/createGroup', async(req,res) => {
    const data = req.body;
    console.log("그룹생성 요청 성공");
    
    const results = await createGroupOrder(data);
    res.json(results);
})
app.post('/memberPageOrder', async(req,res) => {
    const data = req.body;

    console.log("멤버관리 페이지 요청 성공");
    
    const results = await memberPageOrder(data);

    res.json(results);
})

app.get('/getAllSchedule', async (req, res) => {
    console.log("일정 불러오기 요청 성공");
    const results = await schedulePageOrder(1);
    res.json(results);    
});

app.post('/newSchedule', (req, res) => {
    console.log("새로운 일정 저장하기 요청 성공");
    const results = schedulePageOrder(2, req);
    res.json(results);
});

app.delete('/delSchedule/:id', (req, res) => {
    console.log("일정 삭제하기 요청 성공");
    const results = schedulePageOrder(3, req);
    res.json(results);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
