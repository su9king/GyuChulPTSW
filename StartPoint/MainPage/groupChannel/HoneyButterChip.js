// 클라이언트 변수 설정 (실제로는 서버에서 받아올 것)
var clientVariable = 1; // 1이면 글 작성 버튼 노출, 0이면 글 확인 버튼만 노출




//작성된 글 데이터 불러오기. 
// ex) postData 에 [{title : 제목, index: 1, content : 내용}
//                  {title : 제목2, index : 2,content2 : 내용2}]
// 라는 느낌으로 res 왔다고 가정.

const postData = await fetch('loadContents', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
})
.then(response => response.json())

//위에 부분이 아직 작동 못하니 주석처리. 병합 작업간에 확인 바람.
//localStorage.setItem('postData', JSON.stringify(postData));

////////////////////////테스트용 데이터 인풋 코드//////////////////
// 이 코드는 서버 백엔드가 없기 때문에 데이터를 예시 데이터를 넣는 코드임. 
// 테스트를 하기 위한 코드였으니 병합 작업간에 삭제 바람.
var testFiles = [
        { title: "첫 번째 글", index: 1 , content : "1반갑습니다." },
        { title: "두 번째 글", index: 2 , content : "2반갑습니다." },
        { title: "세 번째 글", index: 3 , content : "3반갑습니다."},
        { title: "네 번째 글", index: 4 , content : "4반갑습니다." }
];
localStorage.setItem('postData', JSON.stringify(testFiles));
location.reload(); // 페이지 새로고침하여 테스트 파일 표시
/////////////////////////////////////////////////////////////////

// 버튼 요소 가져오기
var writeButton = document.getElementById('writeButton');
var viewButton = document.getElementById('viewButton');

// 클라이언트 변수에 따라 버튼 노출 설정
if (clientVariable == 1 ) {
    writeButton.style.display = 'block';
    viewButton.style.display = 'block';
} else {
    writeButton.style.display = 'none';
    viewButton.style.display = 'block';
}