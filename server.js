const express = require('express');
const https = require('https');
const socketIo = require('socket.io');
const path = require('path');
const connection = require('./DB');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');
var sessionToken = [];
module.exports = sessionToken;


//GyuChul 이 제작한 모듈 불러오기
const { accessMain } = require('./AccessModule');
const { mainPageOrder } = require('./MainPageOrder');
const { postsOrder } = require('./PostsOrder')
const { createGroupOrder } = require('./creageGroupOrder')
const { memberPageOrder } = require('./memberPageOrder.js')

const app = express();
app.use(bodyParser.json());

const options = {
    //JEYSport.codns.com 서버 열때의 SSL 인증서
    //key: fs.readFileSync('/etc/letsencrypt/live/jeysport.codns.com/privkey.pem'),
    //cert: fs.readFileSync('/etc/letsencrypt/live/jeysport.codns.com/fullchain.pem')

    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))


};


const server = https.createServer(options,app);

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

app.post('/test', async (req,res) => {
    console.log("Test호출")
    const { imp_uid } = req.body;

    try{
        //인증 토큰 발급
        const getToken = await axios({
            url : 'https://api.iamport.kr/users/getToken',
            method : "post",
            headers : {" Content-Type" : "application/json"},
            data : {
                imp_key : "8513575281368781",
                imp_secret : "0xxTSW8frs14VCX0BLFHkRujRuiPkWUNaAxmZEtrpnU7kSymj8a4QAeoK3TqpS02vsMWx8XjkmgpHldu"
            }
        
        });
        const { access_token } = getToken.data; // 인증 토큰
        const getCertifications = await axios ({

            url : `https://api.iamport.kr/certifications/${imp_uid}`,
            method : "get",
            headers : {"Authorization" : access_token }
        });
        const certificationInfo = getCertifications.data;

        const {unique_key , unique_in_site , name , gender ,birth } = certificationInfo;
        console.log(name,brith);
    } catch(e){
        console.error(e);
    }

})

const PORT = process.env.PORT || 443;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
