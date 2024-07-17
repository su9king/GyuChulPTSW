document.addEventListener('DOMContentLoaded', function() {
    const socket = io();

    const userId = sessionStorage.getItem('userID');
    const messagesList = document.getElementById('messages');
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');

    // 서버로부터 기존 메시지 불러오기
    socket.emit('fetchMessages');

    // 새로운 메시지 수신
    socket.on('chatMessages', (messages) => {
        messagesList.innerHTML = '';
        messages.forEach((message) => {
            const messageEl = document.createElement('div');
            messageEl.textContent = `${message.user}: ${message.text}`;
            messagesList.appendChild(messageEl);
        });
    });

    // 채팅 폼 제출
    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const message = {
            user: userId,
            text: messageInput.value
        };
        socket.emit('newMessage', message);
        messageInput.value = '';
    });
});
