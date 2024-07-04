/*window.onload = async function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('username');
    if (isLoggedIn !== 'true') {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'StartPoint/index.html';
    }
    else {
        userData()
    }
}*/

const username = sessionStorage.getItem('username');

async function userData() {
    try {
        
        const response = await fetch('mainPageOrder?fuctionType=1&user=${username}', { //쿼리에 아이디 포함
            method: 'GET'
        });

        if (response.ok) {
            /*const data = await response.json();
            for(let i = 0; i < data.length; i++) {
                sessionStorage.setItem('grouprname'+ i, data[i][0]); 
                sessionStorage.setItem('authority'+ i, data[i][1]);
            }*/
            sessionStorage.setItem('grouprname1', 1); 
            sessionStorage.setItem('authority1', 0);
            sessionStorage.setItem('grouprname2', 2); 
            sessionStorage.setItem('authority2', 1);

            createButtons(data);

        } else {
            console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }
    } catch (error) {
        console.error('요청 중 오류가 발생했습니다.', error);
    }
}

//document.addEventListener('DOMContentLoaded', function() {



    // 세션에 저장된 'groupname'으로 시작하는 값들 저장
    function getGroupNames() {
        const groupNames = [];
        
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const trimmedKey = key.trim();
            console.log(key);
            // 키가 'groupname'으로 시작하는 경우
            if (trimmedKey.startsWith('groupname')) {
                groupNames.push(sessionStorage.getItem(trimmedKey));
                console.log('true')
            }
            else {
                console.log(trimmedKey.startsWith('groupname'))
            }
        }
        console.log(groupNames);
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
                alert(`Button ${number} clicked`);
                // 해당 그룹 페이지로 넘어가는 코드 추가 필요
            });
            buttonContainer.appendChild(button);
        });
    }

function test() {
    sessionStorage.setItem('groupname1', 1); 
    sessionStorage.setItem('authority1', 0);
    sessionStorage.setItem('groupname2', 5); 
    sessionStorage.setItem('authority2', 1);
    console.log(sessionStorage.length);
    // DOM이 로드된 후 세션 스토리지에서 그룹 이름들을 가져와 버튼 생성
    const groupNames = getGroupNames();
    createButtons(groupNames);
}
//});



async function gotoGroupPage() {
    // 어느 그룹인지 변수 지정
    // 그룹에 대한 데이터 전부 가져오기, 쿼리에 유저아이디, 그룹아이디 포함, 권한 포함

    // const auth = sessionStorage.getItem(authority) 권한을 어떻게 가져오지, 어떤 그룹인지 파악하기가 어려운데 ,,,
    const buttons = document.querySelectorAll('.group-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const selectGroup = event.target.id;  // 클릭된 버튼의 id 획득
            console.log(selectGroup)
            try {
                const username = sessionStorage.getItem('username'); // 세션에서 유저 이름 가져오기

                const response = await fetch(`mainPageOrder?fuctionType=2&user=${username}&group=${selectGroup}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    // 서버에서 받은 데이터 처리 코드 필요
                    window.location.href = 'StartPoint/MainPage/groupOne/groupOne.html'; // 페이지 이동
                } else {
                    console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
                }
            } catch (error) {
                console.error('요청 중 오류가 발생했습니다.', error);
            }
        });
    });
}



function logoutInMainPage() {
    sessionStorage.removeItem('username');
    window.location.href = 'StartPoint/index.html';
}
