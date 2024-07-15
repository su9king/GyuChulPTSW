function pageLoad(){
    const groupID = sessionStorage.getItem('groupID');
    // 서버에서 데이터 가져오기
    fetch('/memberPageOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `groupID=${groupID}&functionType=1`
    }) // 실제 API URL로 변경
    .then(response => response.json())
    .then(data => {
        
            data.forEach(function(name) {
                
                addMember(name["userName"]);
            }) 
     })
    .catch(error => {
            console.error('Error fetching organization name:', error);
            var memberNameElement = document.getElementById('memberName');
            memberNameElement.textContent = '멤버를 불러오지 못했습니다.'; // 에러 시 표시할 메시지
    });
}


// 함수 작동시 컨테이너 2개 먼저 선언이 된 상태여야 함.
function addMember(name) {
    const buttonContainer = document.getElementById('button-container');
    const nameContainer = document.getElementById('memberName-container');

    var memberDiv = document.createElement('div');
    var member = document.createElement('span');
    member.textContent = name;

    var button = document.createElement('button');
    button.textContent = `제외하기`;

    button.addEventListener('click', () => {
        alert(`유저 ${name}를 조직에서 제외합니다.`);
        test(name);
    });

    memberDiv.appendChild(member);
    memberDiv.appendChild(button);

    nameContainer.appendChild(memberDiv);
}

function test(userName){
    const groupID = sessionStorage.getItem('groupID');
    const permission = sessionStorage.getItem('permission');
    fetch('/memberPageOrder', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `groupID=${groupID}&functionType=2&userName=${userName}&permission=${permission}`
    }) // 실제 API URL로 변경
    .then(response => response.json())
    .then(data => {
        if (data == 0){
            alert("권한이 없는데 멤버를 삭제하려고? 죽을래?")

        }else if (data == 1){
            alert("삭제 잘 되었음 축하함!")
            location.reload(true);
        }
     })
    .catch(error => {
            console.error('Error fetching organization name:', error);
            var memberNameElement = document.getElementById('memberName');
            memberNameElement.textContent = '멤버를 정상적으로 제외하지 못했습니다.'; // 에러 시 표시할 메시지
    });
}


window.onload = async function() {
          
    pageLoad();
    
}

