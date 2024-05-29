const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Startpoint 폴더에서 정적 파일 제공
app.use(express.static(path.join(__dirname, 'Startpoint')));

// Minchul 폴더에서 정적 파일 제공
app.use(express.static(path.join(__dirname, 'Minchul')));

// Gyuho 폴더에서 정적 파일 제공
app.use(express.static(path.join(__dirname, 'Gyuho')));

// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Startpoint', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
