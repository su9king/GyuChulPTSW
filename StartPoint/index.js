Kakao.init('kakao_app_key');
console.log( Kakao.isInitialized() );

function loginWithKakao() {

    Kakao.Auth.login({
        success: function (authObj) {
            console.log(authObj); // access토큰 값
            Kakao.Auth.setAccessToken(authObj.access_token); // access토큰값 저장
            getInfo();
        },
        fail: function (err) {
            console.log(err);
        }
    });
}

function getInfo() {
    Kakao.API.request({
        url: '/v2/user/me',  // 정보 요청 엔드포인트: 카카오에서 지정
        success: function (res) {
            console.log(res);
            // 이메일, 성별, 닉네임, 프로필이미지, 생일
            var email = res.kakao_account.email;
            var gender = res.kakao_account.gender;
            var profile_nickname = res.kakao_account.profile.nickname;
            var profile_image = res.kakao_account.profile.thumbnail_image_url;
            var birthday = res.kakao_account.birthday;

            console.log(email, gender, profile_nickname, profile_image, birthday);
            alert(profile_nickname);
        },
        fail: function (error) {
            alert('카카오 로그인에 실패했습니다. 관리자에게 문의하세요.' + JSON.stringify(error));
        }
    });
}

async function login(ID, PW) {


    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const functionType = 0;
    
    const response = await fetch('execute', {
        method : 'POST',
        headers: {'Content-Type' : 'application/x-www-form-urlencoded'},
        body: `functionType=${functionType}&ID=${ID}&PW=${PW}`
    });

    const loginExists = await response.text();
    console.log(loginExists);

    // loginExists : 1 (아이디가 존재하며,비밀번호가 정확함) / : 0 (아이디가 존재하지 않거나, 비밀번호가 틀림)
    
    if (loginExists == '1') {
        alert("로그인 되었습니다!");
    
    } else {
        alert("일치하는 정보가 없습니다.")
        
    }

}

async function register(ID, PW) {

    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const functionType = 1;
    const response = await fetch('execute', {
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}&ID=${ID}&PW=${PW}`
        
    });
    
    const registerExists = await response.text();
    console.log(registerExists);
    // registerExists : 0 (아이디가 존재함) / : 1 (아이디가 존재하지 않음)
   
    if (registerExists == '0') {
        alert("이미 존재하는 정보입니다!");
    } else {
        // 새롭게 데이터베이스에 정보 추가
        alert("회원가입이 완료되었습니다!")
    }

}

async function checkData() {
    const functionType = 2;
    // 최대 데이터 노출 개수는 10개
    const respones = await fetch('execute',{
        method : 'POST',
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        body : `functionType=${functionType}`
    });

    const data = await respones.text();
    console.log(data);
   
}


