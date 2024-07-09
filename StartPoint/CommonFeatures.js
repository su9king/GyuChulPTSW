export function loadNavbar() {
    //사용 조건.  사용할 HTML 파일에 <div id="navbar"></div>가 존재해야 함. 
    fetch('/NavigationOrder')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
        })
        .catch(err => console.error('Error loading additional interface:', err));
}