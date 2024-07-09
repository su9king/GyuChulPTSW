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
