
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
            overlay.classList.add('visible');
            newMemberTemplate.classList.add('visible');
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


    
document.addEventListener('DOMContentLoaded', function() {
    const entryNewGroup = document.getElementById('entryNewGroup');
    const overlay = document.getElementById('overlay2');
    const entryNewGroupTemplate = document.getElementById('entryNewGroupTemplate2');

    function loadTemplate() {
        fetch('EntryNewGroupTemplate.html')
            .then(response => response.text())
            .then(data => {
                entryNewGroupTemplate.innerHTML = data;
                const closeTemplateBtn = entryNewGroupTemplate.querySelector('#closeTemplateBtn');
                if (closeTemplateBtn) {
                    closeTemplateBtn.addEventListener('click', function() {
                        overlay.classList.remove('visible');
                        overlay.classList.add('hidden');
                        entryNewGroupTemplate.classList.remove('visible');
                        entryNewGroupTemplate.classList.add('hidden');
                    });
                }
            })
            .catch(error => console.error('Error loading template:', error));
    }

    if (entryNewGroup) {
        entryNewGroup.addEventListener('click', function() {
            overlay.classList.remove('hidden');
            overlay.classList.add('visible');
            entryNewGroupTemplate.classList.remove('hidden');
            entryNewGroupTemplate.classList.add('visible');
            loadTemplate();
        });
    }
});


function entryNewGroup() {
    const userID = sessionStorage.getItem('userID'); 
    const groupCode = document.getElementById('groupCode').value;
    fetch(`/mainPageOrder?functionType=4&groupCode=${groupCode}&userID=${userID}`)
    .then(response => response.json())
    .then(data => {
        if (data == 1) {
            alert('새로운 그룹에 가입을 완료했습니다!');  // 사용자를 위해서 그룹명을 보여주는 것도 좋을 것 같다만 프로토타입이기에 생략 ,,,
        } else if (data == 2) {
            alert('이미 가입된 조직입니다!')
        } else if (data == 3) {
            alert('어디서 이상한 코드를 들고와서?')
        }
        location.reload; 
        
    })
    .catch(err => console.error('Error loading additional interface:', err));

}