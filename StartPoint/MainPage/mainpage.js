window.onload = function() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('username');
    if (isLoggedIn !== 'true') {
        // 로그인되지 않은 경우 로그인 페이지로 리디렉션
        window.location.href = 'index.html';
    }


function logoutInMainPage() {
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';
}