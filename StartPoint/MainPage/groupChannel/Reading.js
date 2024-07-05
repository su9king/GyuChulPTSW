


var buttonField = document.getElementById('fileList'); // HTML 버튼 추가할 필드 불러오기
const postData = localStorage.getItem("postData") // 세션 데이터 불러오기

//해당 코드 조건문 처리 필요, postDataArray 가 없다면 에러 발생 리스크 존재.
const postDataArray = JSON.parse(postData)// JSON 형태 데이터 타입을 JS 객체로 변환 

//보여주는 기능 함수이긴한데 실제로 작동하는 원리는
// title,index,content 값을 쿼리스트링으로 변환하여 title.html 으로 보내서
//title.html 을 오픈하는 방식
function showContent(data){
    const encodedTitle = encodeURIComponent(data.title);
    const encodedIndex = encodeURIComponent(data.index);
    const encodedContent = encodeURIComponent(data.content);

    const url = `title.html?title=${encodedTitle}&index=${encodedIndex}&content=${encodedContent}`;
    window.location.href = url;
}

        // 파일 목록을 HTML로 추가
postDataArray.forEach(function(data) {
    var Item = document.createElement('button');
    Item.textContent = data.title;
    Item.onclick = function() { showContent(data); };
    buttonField.appendChild(Item);
    });


