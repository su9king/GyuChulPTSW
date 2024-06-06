const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');


//indexTest 코드에서 login,register,checkData 함수 불러오기
const { executeMain } = require('./indexByGyu');


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
app.post('/execute',(req,res) => {
    const { functionType, ID, PW } = req.body; // request, response
    //const result = executeMain(functionType, ID, PW); // 여기에서 아직 함수가 다 안 돌았는데 출력하려고 해서 null값 등장
    (async function() {  // executeMain함수에 await메소드를 쓰기 위한 코드; server.js에 어울리지 않는 긴 코드로 수정필요
        try {
            const result = await executeMain(functionType, ID, PW); 
            console.log(result);
        } catch (error) {
            console.error(error); // 에러 처리
        }
    })();
})

// app.post('/login', (req, res) => {
//     const { ID, PW } = req.body;
//     login(ID, PW);
//     res.send("서버사이드 측 콘솔 결과 : login 호출");
// });

// app.post('/register', (req, res) => {
//     const { ID, PW } = req.body;
  
//     register(ID, PW);
//     res.send("서버사이드 측 콘솔 결과 : register 호출");
// });

// app.post('/checkData', (req, res) => {
    
//     checkData();
//     res.send("서버사이드 측 콘솔 결과 : checkData 호출");
// });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
