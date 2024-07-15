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
        checkInvite(userID);
    }
}


//해당 유저에게 수신된 초대장 확인
async function checkInvite(userID) {

        const response = await fetch(`/mainPageOrder?functionType=3&userID=${userID}`, {
            method: 'GET'
        });

        const data = await response.json();

    
        const overlay = document.getElementById('overlay');
        const newMemberTemplate = document.getElementById('newMemberTemplate');
        
        function loadTemplate(data2) {
            fetch('MyGroupTemplate.html')
                .then(response => response.text())
                .then(data => {
            

                    newMemberTemplate.innerHTML = data;
                    const closeTemplateBtn = newMemberTemplate.querySelector('#closeTemplateBtn');
                    
                    const organizationNameElement = newMemberTemplate.querySelector('#organizationName');
                    organizationNameElement.textContent = data2[0]['groupName']; // 응답 데이터에서 조직 이름을 가져와 업데이트
                    if (closeTemplateBtn) {
                        closeTemplateBtn.addEventListener('click', function() {
                            overlay.classList.remove('visible');
                            newMemberTemplate.classList.remove('visible');
                        });
                    }
                    if (acceptBtn) {
                        acceptBtn.addEventListener('click', function() {
                            fetch('/memberPageOrder', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded'
                                },
                                body: `groupID=${data2[0]['groupID']}&functionType=4&userID=${data2[0]['userID']}`
                            }) // 실제 API URL로 변경
                            .then(response => response.json())
                            .then(data => {
                                if (data == 0){
                                    alert("오류가 발생했습니다.")
                        
                                }else if (data == 1){
                                    alert("해당 조직에 참여하였습니다.")
                                    location.reload(true);
                                }
                             })
                            .catch(error => {
                                    console.error('에러 발생함', error);
                                   
                            });
                        });
                    }
                })
                .catch(error => console.error('Error loading template:', error));
            }
        
    
        overlay.classList.add('visible');
        newMemberTemplate.classList.add('visible');

        if (data.length > 0){
            loadTemplate(data);
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



function callBuyingSystem(){
    console.log("결제시스템 테스트");
}

function entryNewGroup(){
    console.log("새로운 조직 참가");
}

function accept(){
    
}