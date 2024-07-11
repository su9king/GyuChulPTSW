window.onload = async function() {
    loadNavbar();
}

document.addEventListener("DOMContentLoaded", function() {

    var groupID = sessionStorage.getItem('groupID');

    // // 버튼 요소 가져오기
    // var writeButton = document.getElementById('writeButton');
    // var viewButton = document.getElementById('viewButton');

    // //후에 권한에 따른 리소스 제공 코드 필요
    // writeButton.style.display = 'block';
    // viewButton.style.display = 'block';

    // 서버에서 데이터 가져오기
    fetch(`/mainPageOrder?functionType=2&groupID=${groupID}`) // 실제 API URL로 변경
        .then(response => response.json())
        .then(data => {
            // 데이터 가져오기 성공 시 조직 이름 업데이트
            const organizationNameElement = document.getElementById('organizationName');
            organizationNameElement.textContent = data[0]['groupName']; // 응답 데이터에서 조직 이름을 가져와 업데이트
        })
        .catch(error => {
            console.error('Error fetching organization name:', error);
            const organizationNameElement = document.getElementById('organizationName');
            organizationNameElement.textContent = '조직 이름을 불러오지 못했습니다.'; // 에러 시 표시할 메시지
        });
});
