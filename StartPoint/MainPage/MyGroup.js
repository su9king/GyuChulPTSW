import { loadNavbar } from '/CommonFeatures.js';

window.onload = async function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('userID');
    if (isLoggedIn == false) {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'StartPoint/index.html';
    }
    else {
        const userID = sessionStorage.getItem('userID');
        createButtons(await allGroupList(userID));
        loadNavbar();

        
    }
}

// 유저가 속해있는 조직
async function allGroupList(userID) {
    try {        
        const response = await fetch(`/mainPageOrder?functionType=1&userID=${userID}`, {
            method: 'GET'
        });

        if (response.ok) {
            const groups = [];
            const data = await response.json();
            for(let i = 0; i < data.length; i++) {
                let buffer = JSON.parse(JSON.stringify(data[i]))
                groups.push(buffer);
            }

        return groups;
            
        } else {
            console.error(`데이터 요청에 실패했습니다. 상태 코드: ${response.status}`);
        }
    } catch (error) {
        console.error('요청 중 오류가 발생했습니다.', error);
    }
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

async function gotoGroupPage(groupID) {
            sessionStorage.setItem('groupID', groupID); 
            window.location.href = 'GroupPage/GroupMain.html'; 
}

function logoutInMainPage() {
    sessionStorage.removeItem('userID');
    sessionStorage.clear();
    window.location.href = 'StartPoint/index.html';
}


function gotoCreateGroup() {
    window.location.href = 'CreateGroup/CreateGroup.html';
}