// 클라이언트 변수 설정 (실제로는 서버에서 받아올 것) -> 세션에 이미 있는데?!
var groupId = sessionStorage.getItem(key.startsWith('groupname'));
var clientAuthority = sessionStorage.getItem(key.startsWith('authority')); // 1이면 글 작성 버튼 노출, 0이면 글 확인 버튼만 노출

const postData = await fetch('/loadContents', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ groupId })
})
.then(response => response.json())
.then(data => {
    console.log('load하기 성공') //데이터 확인용 코드
    if (data) {
        localStorage.setItem('postData', JSON.stringify(data));
        location.reload(); // 페이지 새로고침하여 테스트 파일 표시
    } 
})
.catch(error => {
    console.error('Error:', error);
    alert('서버와의 통신에 문제가 발생했습니다.');
});

// 버튼 요소 가져오기
var writeButton = document.getElementById('writeButton');
var viewButton = document.getElementById('viewButton');

// 클라이언트 변수에 따라 버튼 노출 설정
if (clientAuthority == 1 ) {
    writeButton.style.display = 'block';
    viewButton.style.display = 'block';
} else {
    writeButton.style.display = 'none';
    viewButton.style.display = 'block';
}