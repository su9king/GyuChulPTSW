async function login(ID, PW) {


    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const functionType = 0;
    
    const response = await fetch('index.php', {
        method : 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        body: `functionType=${functionType}&ID=${ID}&PW=${PW}`
    });

    const loginExists = await response.text();
    console.log(loginExists);

    // loginExists : 1 (아이디가 존재하며,비밀번호가 정확함) / : 0 (아이디가 존재하지 않거나, 비밀번호가 틀림)
    
    if (loginExists == 1) {
        alert("로그인 되었습니다!");
        window.location.href = "Gyuho.html"
    } else {
        alert("일치하는 정보가 없습니다.")
    }

}

async function register(ID, PW) {

    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const functionType = 1;
    const response = await fetch('index.php', {
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}&ID=${ID}&PW=${PW}`
        
    });
    
    const registerExists = await response.text();
    console.log(registerExists);
    // registerExists : 1 (아이디가 존재함) / : 0 (아이디가 존재하지 않음)
   
    if (registerExists == 1) {
        alert("이미 존재하는 정보입니다!");
    } else {
        // 새롭게 데이터베이스에 정보 추가
        alert("회원가입이 완료되었습니다!")
    }

}

async function checkData() {
    const functionType = 2;
    // 최대 데이터 노출 개수는 10개
    const respones = await fetch('index.php',{
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}`
    });

    const data = await respones.text();
    console.log(data);
   
}
