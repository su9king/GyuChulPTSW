function loadNavbar() {
    // 사용 조건: 사용할 HTML 파일에 <div id="navbar"></div>가 존재해야 합니다.
    fetch('/NavigationOrder')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar').innerHTML = html;
          
            //이유는 모르겠으나, html 에서 script src 를 작성하면 실행이 되지 않음.
            //수동으로 html 파일에 넣는 형태로 진행.
            var script = document.createElement('script');
            script.src = '/NavigationBar/NavigationBar.js'; 
            document.getElementById('navbar').appendChild(script);
            
        })
        .catch(err => console.error('Error loading additional interface:', err));
}

function loadSidebar() {
    // 사용 조건: 사용할 HTML 파일에 <div id="navbar"></div>가 존재해야 합니다.
    fetch('/SideBarOrder')
        .then(response => response.text())
        .then(html => {
            document.getElementById('sidebar').innerHTML = html;
          
            //이유는 모르겠으나, html 에서 script src 를 작성하면 실행이 되지 않음.
            //수동으로 html 파일에 넣는 형태로 진행.
            //현재 자바스크립트 코드가 없기 때문에 넣지 않음.
            //var script = document.createElement('script');
            //script.src = '/NavigationBar/SideBar.js'; 
            //document.getElementById('sidebar').appendChild(script);
            
        })
        .catch(err => console.error('Error loading additional interface:', err));
}


window.loadNavbar = loadNavbar;
window.loadSidebar = loadSidebar;