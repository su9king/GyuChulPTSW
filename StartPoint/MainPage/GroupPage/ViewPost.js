window.onload = async function() {
    loadSidebar();
    loadNavbar();

    var buttonField = document.getElementById('fileList'); // HTML 버튼 추가할 필드 불러오기
    console.log(buttonField)
    var writeButton = document.getElementById('writeButton');

    const groupID = sessionStorage.getItem('groupID');
    const postData = fetch('/postsOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `functionType=1&groupID=${groupID}`
    })
    .then(response => response.json())
    .then(data => {
        const postDataArray = data
        postDataArray.forEach(function(data) {
            console.log(data)
            var Item = document.createElement('button');
            Item.textContent = data['title'];
            Item.onclick = function() { showContent(data); };

            buttonField.appendChild(Item);
            });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버와의 통신에 문제가 발생했습니다.');
    });
}

//writeButton.style.display = 'none';
// const permission = fetch(
//     ///////////////////////////permission 요청하기///////////////////////////
// );

// if (permission == 1) {
//     writeButton.style.display = 'block';
// }

//보여주는 기능 함수이긴한데 실제로 작동하는 원리는
// title,index,content 값을 쿼리스트링으로 변환하여 Post.html 으로 보내서
//Post.html 을 오픈하는 방식
function showContent(data){
    const encodedTitle = encodeURIComponent(data['title']);
    const encodedIndex = encodeURIComponent(data['postID']);
    const encodedContent = encodeURIComponent(data['content']);

    const url = `post.html?title=${encodedTitle}&index=${encodedIndex}&content=${encodedContent}`;
    window.location.href = url;
}
