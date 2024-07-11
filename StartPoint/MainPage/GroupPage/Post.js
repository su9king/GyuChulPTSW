window.onload = async function() {
       
    loadNavbar();
    //loadSidebar();
    const queryString = window.location.search; // 쿼리스트링 가져오기
    const urlParams = new URLSearchParams(queryString); // URL SearchParams 객체 생성
        

    const title = urlParams.get('title'); //urlParams 객체에서 해당 파라미터로 value 가져오기
    const index = urlParams.get('index');
    const content = urlParams.get('content');
        
    //html에 요소 추가.
    document.getElementById('title').textContent = title;
    document.getElementById('index').textContent = `Index: ${index}`;
    document.getElementById('content').textContent = content;
    }

    
function remove(){
    const queryString = window.location.search; // 쿼리스트링 가져오기
    const urlParams = new URLSearchParams(queryString); // URL SearchParams 객체 생성

    const index = urlParams.get('index');
    console.log(index);
    fetch('/postsOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },//현재 permission 고정된 상황. 세션에서 가져오기 필요.
        body: `postID=${index}&permission=0&functionType=3`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data) //데이터 확인용 코드
        if (data == 1) {
            alert('글이 성공적으로 삭제 되었습니다!');
            window.location.href = "ViewPost.html"
            
        } else if (data == 0) {
            alert('권한이 없는데 게시물을 삭제하려고 해 ? 어림도 없지');
        } else {
            alert("뭔 에러임 이건? 나도 모르겠음 ㅇㅇ")
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버와의 통신에 문제가 발생했습니다.');
    });
} 

