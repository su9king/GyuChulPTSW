async function login(ID, PW) {
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
}

async function register(ID, PW) {
    // 구글 스프레드시트에서 ID, PW 확인 , 계산 및 알고리즘은 보안상 php언어로 진행.
    // registerExists : 1 (아이디가 존재함) / : 0 (아이디가 존재하지 않음)
    var ID = document.getElementById('ID').value;
    var PW = document.getElementById('PW').value;

    const loginExists = 1; // 예시 값

    if (loginExists === 1) {
        alert("이미 존재하는 정보입니다!");
    } else {
        // 새롭게 데이터베이스에 정보 추가
        alert("회원가입이 완료되었습니다!")
    }
}

async function checkData() {
    // 구글 스프레드시트에서 모든 ID, PW 데이터 가져오기 계산 및 알고리즘은 보안상 php언어로 진행.
    const data = [["ID1", "PW1"], ["ID2", "PW2"]]; // 예시 데이터
    // 최대 데이터 노출 개수는 10개

    // 받아온 데이터를 테이블 형태로 출력하는 코드가 작성되어야 함.

}

// 실행및 계산되는 부분에 대해서는 php언어로 진행함. php 스크립트의 부분에는 index.php 표시 및 추가내용 주석처리 바랍니다.