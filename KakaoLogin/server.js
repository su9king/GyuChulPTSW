const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(__dirname)));
//app.use(express.static(path.join(__dirname))); 이건 현재 위치의 디렉토리를 가져와라; GIT DEV 디렉토리 자체를 리소스로 가져옴

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'KakaoLogin.html'));
    //res.sendFile(path.join(__dirname, 'KakaoLogin.js'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/*const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) => {
  
    if (req.url === '/') {
        fs.readFile('./KakaoLogin.html', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
    }

    else if (req.url === '/KakaoLogin.js') {
        fs.readFile('./KakaoLogin.js', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.js');
            }

            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        });
    }

    else if (req.url === '/image.jpg') {
        fs.readFile('./image.jpg', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.js');
            }

            res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.end(data);
        });
    }

    
});


const PORT = process.env.PORT || 3000;
server.listen(PORT , () => console.log(`server running on port ${PORT}`));*/

