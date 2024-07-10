window.onload = async function() {
    loadNavbar();
}

var today = new Date();
var dateString = today.toISOString().split('T')[0];

function save(){
    var newGroupName = document.getElementById('createGroupName').value;
    var newintroduction = document.getElementById('introduction').value;
    var sportsType = document.getElementById('sportsType').value;
    var userID = sessionStorage.getItem('userID');
    
    //해당 조건문은 title,content 값이 존재할때 작동하기 위한 조건문.
    if (newGroupName && sportsType) {
        fetch('/createGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `groupName=${newGroupName}&userID=${userID}&sportType=${sportsType}&introduction=${newintroduction}&createdDate=${dateString}`
        })
        .then(response => response.text())
        .then(data => {
            console.log(data) //데이터 확인용 코드
            if (data == 1) {
                // 입력 필드 초기화
                document.getElementById('createGroupName').value = '';
                document.getElementById('introduction').value = '';

                alert('Create New Group Complete!');
                window.location.href = '../MyGroup.html'
                
            } else {
                alert('조직 생성에 실패하였습니다. 다시 시도해 주세요.');
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


/*
$('.introduction textarea').keyup(function(){
    var content = $(this).val();
    $('.introduction .count span').html(content.length);
    if (content.length > 85){
      alert("최대 85자까지 입력 가능합니다.");
      $(this).val(content.substring(0, 85));
      $('.introduction .count span').html(85);
    }
  });
*/

