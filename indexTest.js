console.log("indexTest 파일 실행됨.");

function login(ID, PW) {
    console.log("로그인 결과 :", ID, "PW:", PW);
    return('1');
}

function register(ID, PW) {
    console.log("회원가입 결과:", ID, "PW:", PW);
}

function checkData() {
    console.log("데이터 확인");
}
function indexTestMain(){
    login(1,2);
    register(3,4);
    checkData();
}

module.exports = {
    indexTestMain
};
