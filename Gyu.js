async function login(ID, PW) {
<<<<<<< HEAD:Gyu.js
    // 구글 스프레드시트에서 ID, PW 확인 , 계산 및 알고리즘은 보안상 php언어로 진행.
    // loginExists : 1 (아이디가 존재하며,비밀번호가 정확함) / : 0 (아이디가 존재하지 않거나, 비밀번호가 틀림)
    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const loginExists = 1; // 예시 값

    if (loginExists === 1) {
        alert("로그인 되었습니다!");
        window.location.href = "http://gyuchul-dev.s3-website.ap-northeast-2.amazonaws.com/"
    } else {
        alert("일치하는 정보가 없습니다.")
    }
=======
    const functionType = 0;
    
    const response = await fetch('index.php', {
        method : 'POST',
        headers: {'ContentType' : 'application/x-www-form-urlencoded'},
        body: `functionType=${functionType}&ID=${ID}&PW=${PW}`
    });

    const loginExists = await response.text();
    console.log(loginExists);

    // loginExists : 1 (아이디가 존재하며,비밀번호가 정확함) / : 0 (아이디가 존재하지 않거나, 비밀번호가 틀림)
>>>>>>> cf790584fff430e4449d1fae64be2852a9309003:StartPoint/index.js
}

async function register(ID, PW) {
    const functionType = 1;
    const response = await fetch('index.php', {
        method : 'POST',
        headers : {'ContentType' : 'application/x-www-form-urlencoded'},
        body : `fuctionType=${functionType}&ID=${ID}&PW=${PW}`
        
    });
    
    const registerExists = await response.text();
    console.log(registerExists);
    // registerExists : 1 (아이디가 존재함) / : 0 (아이디가 존재하지 않음)
<<<<<<< HEAD:Gyu.js
    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const loginExists = 1; // 예시 값

    if (loginExists === 1) {
        alert("이미 존재하는 정보입니다!");
    } else {
        // 새롭게 데이터베이스에 정보 추가
        alert("회원가입이 완료되었습니다!")
    }
=======
>>>>>>> cf790584fff430e4449d1fae64be2852a9309003:StartPoint/index.js
}

async function checkData() {
    const functionType = 2;
    // 최대 데이터 노출 개수는 10개
    const respones = await fetch('index.php',{
        method : 'POST',
        headers : {'ContentType' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}&ID=${ID}&PW=${PW}`
    });

    const data = await respones.text();
    console.log(data);
   
}
