var groupID = sessionStorage.getItem(groupID);


// const postData = await fetch('/postsOrder', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: `functionType=1&groupID=${groupID}`
// })
// .then(response => response.json())
// .then(data => {
//     console.log('load하기 성공')
//     if (data) {
//         localStorage.setItem('postData', JSON.stringify(data));
//         location.reload(); // 페이지 새로고침하여 테스트 파일 표시
//     } 
// })
// .catch(error => {
//     console.error('Error:', error);
//     alert('서버와의 통신에 문제가 발생했습니다.');
// });

// 버튼 요소 가져오기
var writeButton = document.getElementById('writeButton');
var viewButton = document.getElementById('viewButton');

// 클라이언트 변수에 따라 버튼 노출 설정
// if (clientAuthority == 1 ) {
//     writeButton.style.display = 'block';
//     viewButton.style.display = 'block';
// } else {
//     writeButton.style.display = 'block';
//     viewButton.style.display = 'block';
// }
writeButton.style.display = 'block';
viewButton.style.display = 'block';