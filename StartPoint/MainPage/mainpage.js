window.onload = async function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('username');
    if (isLoggedIn == 'false') {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'StartPoint/index.html';
    }
    else {
        userData()
        const groupNames = getGroupNames();
        createButtons(groupNames);
    }
}

const username = sessionStorage.getItem('username');

async function userData() {
    try {        
        const response = await fetch('mainPageOrder?fuctionType=1&user=${username}', { //쿼리에 아이디 포함
            method: 'GET'
        });

        if (response.ok) {
            console.log(response)
            /*const data = await response.json();
            for(let i = 0; i < data.length; i++) {
                sessionStorage.setItem('grouprname'+ i, data[i][0]); 
                sessionStorage.setItem('authority'+ i, data[i][1]);
            }*/
            ///////////////////////// 세션에 데이터를 저장할 때, key의 이름을 groupname+'실제 그룹 아이디'로 저장하는 것이 베스트
            ///////////////////////// 이유는 아래 gotoGroupPage()를 설정할 때 쿼리에 authority 값을 불러오는데 훨씬 유용함(85번째 줄 추가 주석 있음)
            sessionStorage.setItem('grouprname1', 1);   /////////////////////////test data/////////////////////////
            sessionStorage.setItem('authority1', 0);
            sessionStorage.setItem('grouprname2', 2); 
            sessionStorage.setItem('authority2', 1);
        } else {
            console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }
    } catch (error) {
        console.error('요청 중 오류가 발생했습니다.', error);
    }
}

// 세션에 저장된 'groupname'으로 시작하는 값들 저장
function getGroupNames() {
    const groupNames = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        // 키가 'groupname'으로 시작하는 경우
        if (key.startsWith('groupname')) {
            groupNames.push(sessionStorage.getItem(key));
        }
        else {
            console.log(key.startsWith('groupname'))
        }
    }
    return groupNames;
}

// 버튼 생성
function createButtons(groupNames) {
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = '';

    groupNames.forEach((number, index) => {
        const button = document.createElement('button');
        button.textContent = `Button ${number}`;
        button.addEventListener('click', () => {
            alert(`group ${number} selected`);
            gotoGroupPage(number);
        });
        buttonContainer.appendChild(button);
    });
}


async function gotoGroupPage(groupId) {
    // 그룹에 대한 데이터 전부 가져오기; 쿼리에 유저아이디, 그룹아이디 포함, 권한 포함
            try {
                const username = sessionStorage.getItem('username'); // 세션에서 유저 이름 가져오기
                const authority = sessionStorage.getItem(`authority${groupId}`); ////////////// 이 부분에서 그룹 아이디에 맞는 groupname+숫자 를 찾고, 그에 맞는 authority를 다시 찾는 로직이 필요해짐
                const response = await fetch(`mainPageOrder?fuctionType=2&user=${username}&group=${groupId}&autority=${authority}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    ////////////////////////////////////////////////////////////// 서버에서 받은 데이터 처리 코드 필요
                    ////////////////////////////////////////////////////////////// 선택된 그룹에 맞는 그룹채널 페이지로 이동(그룹 채널 리소스에 맞게 코드 필요)
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
