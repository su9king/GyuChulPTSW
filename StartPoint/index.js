async function login(ID, PW) {
    const functionType = 0;
    const IDTest = "신민철";
    const PWTest = "123456";
    
    const response = await fetch('index.php', {
        method : 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        body: `functionType=${functionType}&ID=${IDTest}&PW=${PWTest}`
    });

    const loginExists = await response.text();
    console.log(loginExists);

    // loginExists : 1 (아이디가 존재하며,비밀번호가 정확함) / : 0 (아이디가 존재하지 않거나, 비밀번호가 틀림)
}

async function register(ID, PW) {
    const functionType = 1;
    const response = await fetch('index.php', {
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `fuctionType=${functionType}&ID=${ID}&PW=${PW}`
        
    });
    
    const registerExists = await response.text();
    console.log(registerExists);
    // registerExists : 1 (아이디가 존재함) / : 0 (아이디가 존재하지 않음)
}

async function checkData() {
    const functionType = 2;
    // 최대 데이터 노출 개수는 10개
    const respones = await fetch('index.php',{
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}&ID=${ID}&PW=${PW}`
    });

    const data = await respones.text();
    console.log(data);
   
}
