
// document.addEventListener("DOMContentLoaded", function() {
//     fetch('/NavigationOrder')
//         .then(response => response.text())
//         .then(data => {
//             document.getElementById('navbar').innerHTML = data;
//         })
//         .catch(error => console.error('Error loading navbar:', error));
// });


function logout() {

    const functionType = 5;
    const response = fetch('/execute', {
        method : 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        body: `functionType=${functionType}&Token=${sessionStorage.getItem('userID')}`
    });
    sessionStorage.clear();
    alert('로그아웃되었습니다!')
    window.location.href = "/";
}

function previous(){
    window.history.go(-1);
}

