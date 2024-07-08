function save(){
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var groupID = sessionStorage.getItem('groupID');
    var userID = sessionStorage.getItem('userID');
    console.log(groupID)
    //해당 조건문은 title,content 값이 존재할때 작동하기 위한 조건문.
    if (title && content) {
        /*var postData = {
            title: title,
            content: content
        };*/
        console.log(groupID)
        // 서버로 데이터 전송.response 를 담을 변수를 사용하지 않은 이유는..그냥 한번 이렇게도 해봐야지!
        fetch('/postsOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `title=${title}&content=${content}&groupID=${groupID}&functionType=2`
        })
        .then(response => response.json()) //then 이 두번 사용된 이유는, response 를 json 형태로 파싱한 후, 이 값을
        //이어서 다음 then 에 사용할 수 있음. 즉 .then(data) 는 바로 위에 response 와 같은 값이 들어 있지만 맥락상 
        //위에 then 은 response 말이 맞고, 아래 then 에서는 data의 형태로 사용 되고 있으니 이와 같은 형태를 지님.
        // 현재 코드에서 돌아오는 response 의 대한 내용은 True or False와 같은 성공 or 실패만을 데이터로 주는 것을 가정한 상황임. 
        .then(data => {
            console.log(data) //데이터 확인용 코드
            if (data) {
                alert('글이 성공적으로 저장되었습니다!');
                // 입력 필드 초기화
                document.getElementById('title').value = '';
                document.getElementById('content').value = '';
            } else {
                alert('글 저장에 실패하였습니다. 다시 시도해 주세요.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('서버와의 통신에 문제가 발생했습니다.');
        });
    } else {
        alert('제목과 내용을 모두 입력해 주세요.');
    }
}