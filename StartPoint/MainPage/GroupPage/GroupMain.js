var groupID = sessionStorage.getItem(groupID);

// 버튼 요소 가져오기
var writeButton = document.getElementById('writeButton');
var viewButton = document.getElementById('viewButton');

//후에 권한에 따른 리소스 제공 코드 필요
writeButton.style.display = 'block';
viewButton.style.display = 'block';