window.onload = async function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('username');
    if (isLoggedIn !== 'true') {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'StartPoint/index.html';
    }
    else {
        userData()
    }
}

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
        } else {
            console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }
    } catch (error) {
        console.error('요청 중 오류가 발생했습니다.', error);
    }
}

// groupname1, 2에 대한 버튼 노출
const visibleButtonId = '1'; // 버튼 1를 보이게 설정

document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.group-button');

    buttons.forEach(button => {
        const buttonId = button.id;

        if (buttonId === visibleButtonId) {
            button.style.display = 'inline-block';
        } else {
            button.style.display = 'none';
        }
    });
});



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
