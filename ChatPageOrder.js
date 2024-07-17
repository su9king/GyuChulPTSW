const socketIo = require('socket.io');
const fs = require('fs').promises;
const path = require('path');

const chatFilePath = path.join(__dirname, 'ChatMessages.json');

module.exports = (server) => {
    const io = socketIo(server);
    //const userId = sessionStorage.getItem('userID');
    const userId = 'Gyu'
    // const onlineUsers = document.getElementById('onlineUsers');

    // 클라이언트 연결시
    io.on('connection', (socket) => {
        console.log(userId, 'connected');
        // const onlineList = document.createElement('div');  // 온라인 유저 현재활동중 개발 보류
        // onlineList.textContent = 'userId';
        // onlineUsers.appendChild(onlineList);

        // 기존 채팅 메시지 불러오기
        socket.on('fetchMessages', async () => {
            try {
                const data = await fs.readFile(chatFilePath, 'utf8');
                const messages = JSON.parse(data);
                socket.emit('chatMessages', messages);
            } catch (error) {
                console.error('Failed to read chat messages:', error);
            }
        });

        // 새 채팅 전송시
        socket.on('newMessage', async (message) => {
            try {
                const data = await fs.readFile(chatFilePath, 'utf8');
                const messages = JSON.parse(data);
                messages.push(message);
                await fs.writeFile(chatFilePath, JSON.stringify(messages, null, 2));
                io.emit('chatMessages', messages); // 모든 클라이언트에게 메시지 전송
            } catch (error) {
                console.error('Failed to save chat message:', error);
            }
        });

        // 클라이언트 연결 해제시
        socket.on('disconnect', () => {
            console.log(userId, 'disconnected');
            // const onlineList = document.createElement('div');
            // onlineList.textContent = '';
            // onlineUsers.appendChild(onlineList);
        });
    });
};
