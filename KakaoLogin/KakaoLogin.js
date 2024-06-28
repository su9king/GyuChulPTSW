 // 카카오 SDK 초기화
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

// authObj : 카카오 로그인 성공 시 반환되는 객체
/* 아래와 같은 구조를 가진다
{
  "access_token": "ACCESS_TOKEN", ; 사용자의 엑세스 토큰
  "expires_in": 12345, ; 만료시간(sec)
  "refresh_token": "REFRESH_TOKEN", ; 갱신을 위한 리프레시 토큰(?)
  "refresh_token_expires_in": 1234567, ; 리프레시 토큰의 만료시간(sec)
  "scope": "SCOPE", ; 엑세스 권한 범위
  "token_type": "bearer"
}
*/

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
        },
        fail: function (error) {
            alert('카카오 로그인에 실패했습니다. 관리자에게 문의하세요.' + JSON.stringify(error));
        }
    });
}

function kakaoLogout() {
  if (!Kakao.Auth.getAccessToken()) {  // 이미 지정된 토큰이 없음 -> 로그아웃 된 상태
      alert('Not logged in.');
      return;
  }
  Kakao.Auth.logout(function() {  // 현재 토큰 만료
      alert('Logout success');

      //location.reload();  // 페이지 새로고침하여 로그인 세션 종료
  });
}

function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/*
deleteCookie("_kawlt"); // 모든 쿠키 삭제 호출
deleteCookie("_kawltea");
*/


/*
function deleteLocalCookies() {
  var cookies = document.cookie.split(";");
  console.log(cookies);
  
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      console.log(name);
      // http://127.0.0.1:3000 도메인에서 쿠키 삭제
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=127.0.0.1";
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=localhost";
  }
}
*/


//////////////////////////////////////////////////////
// 아래는 카카오 개발에서 제공하는 코드를 조합한 것인데 //
// 실제 통신에 사용되는 토큰을 활용하는 것이 아니라 /////
// 임의의 토큰을 직접 만들어서 통신하는 형태로 보임 /////
/////////////////////////////////////////////////////

/*
function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: 'http://127.0.0.1:3000',
    prompts: 'login', // 매번 새로 로그인하기
    state: 'userme', // 유효성 검증을 위해
  });
}

// 페이지 로드 시 토큰을 표시
displayToken();

function requestUserInfo() {
    Kakao.API.request({
      url: '/v2/user/me',
    })
      .then(function(res) {
        alert(JSON.stringify(res));
      })
      .catch(function(err) {
        alert(
          'failed to request user information: ' + JSON.stringify(err)
        );
      });
}


  function displayToken() {
    var token = getCookie('authorize-access-token');
    console.log(token);

    if(token) {
      Kakao.Auth.setAccessToken(token);
      document.querySelector('#token-result').innerText = 'login success, ready to request API';
      document.querySelector('button.api-btn').style.visibility = 'visible';
    }
  }

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  
*/
