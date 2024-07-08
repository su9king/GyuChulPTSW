const socket  = io();

function sendMessage(){

    var message = document.getElementById('message').value;
    socket.emit('chat message', message); //서버로 메시지 보내기
}

socket.on('chat message', function(msg){
    var item = document.createElement('li'); // 'createElemant'가 아니라 'createElement'가 올바른 메서드 이름입니다.
    item.textContent = msg;
    document.getElementById('messages').appendChild(item); // 메시지 목록에 추가
    window.scrollTo(0, document.body.scrollHeight); 
});