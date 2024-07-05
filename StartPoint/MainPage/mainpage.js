window.onload = async function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('username');
    if (isLoggedIn == false) {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'StartPoint/index.html';
    }
    else {
        userData()
        const groups = getGroup();
        createButtons(groups);
    }
}

const username = sessionStorage.getItem('username');

async function userData() {
    try {        
        const response = await fetch(`/mainPageOrder?functionType=1&user=${username}`, { //쿼리에 아이디 포함
            method: 'GET'
        });

        if (response.ok) {

            const data = await response.json();
            for(let i = 0; i < data.length; i++) {
                sessionStorage.setItem('groupIndex'+ i, JSON.stringify(data[i])); 
            }
            
        } else {
            console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }
    } catch (error) {
        console.error('요청 중 오류가 발생했습니다.', error);
    }
}

// 세션에 저장된 'groupname'으로 시작하는 값들 저장
function getGroup() {
    const groups = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {

        const key = sessionStorage.key(i);
        // 키가 'groupIndex'으로 시작하는 경우
        if (key.startsWith('groupIndex')) {
            let buffer = JSON.parse(sessionStorage.getItem(key))
            groups.push(buffer);
        }
        else {
            console.log(key.startsWith('groupIndex'))
        }
    }
    return groups;
}

// 버튼 생성
function createButtons(groups) {
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = '';
    
    console.log(groups)
    groups.forEach((group, index) => {
        console.log(group);
        const button = document.createElement('button');
        button.textContent = `Button ${group['groupName']}`;
        button.addEventListener('click', () => {
            alert(`group ${group['groupName']} selected`);
            gotoGroupPage(group['groupID']);
        });
        buttonContainer.appendChild(button);
    });
}


async function gotoGroupPage(groupId) {
    // 그룹에 대한 데이터 전부 가져오기; 쿼리에 유저아이디, 그룹아이디 포함, 권한 포함
            try {
                const username = sessionStorage.getItem('username'); // 세션에서 유저 이름 가져오기
                //const authority = sessionStorage.getItem(`authority${groupId}`); ////////////// 이 부분에서 그룹 아이디에 맞는 groupname+숫자 를 찾고, 그에 맞는 authority를 다시 찾는 로직이 필요해짐
                const response = await fetch(`/mainPageOrder?fuctionType=2&user=${username}&groupID=${groupId}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data); 
                    //window.location.href = '/groupChannel/HoneyButterChip.html'; 
                    
                } else {
                    console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
                }
            } catch (error) {
                console.error('요청 중 오류가 발생했습니다.', error);
            }
}



function logoutInMainPage() {
    sessionStorage.removeItem('username');
    sessionStorage.clear();
    window.location.href = 'StartPoint/index.html';
}
