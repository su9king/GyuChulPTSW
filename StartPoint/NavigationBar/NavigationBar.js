<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function() {
    const navbarHTML = `
        <nav id="nav1">
            <ul>
            <li><a href="StartPoint/Login.html">Login Page</a></li>
            <li><a href="#">menu2</a></li>
            <li><a href="#">menu3</a></li>
            <li><a href="#">menu4</a></li>
            <li><button onclick = 'logout()'>Logout</button></li>
            </ul>
        </nav>
    `;
    document.getElementById('navbar').innerHTML = navbarHTML;
});
=======
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
>>>>>>> chul01
