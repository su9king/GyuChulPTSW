const express = require('express');
const connection = require('./DB');
const server = require('./server');
var sessionToken = server.sessionToken;

// 회원가입 함수
async function registerUser(ID, PW) {
    //Promise 키워드 정보 추가 조사 필요.
    return new Promise((resolve, reject) => {
        console.log(ID, PW);
        connection.query('SELECT 1 FROM users WHERE username = ?', [ID],
            (error, results, fields) => {
                if (error) {
                    console.error('쿼리 실행 오류:', error);
                    return reject(error);
                }//length 를 넣지 않으면 0일때 코드 오류 발생해서 일단 가볍게 이걸로 넣어둠.
                if (results.length > 0 && results[0]['1'] == 1) {
                    console.log("Fail");
                    resolve(0);
                } else {
                    console.log("Success");
                    connection.query('INSERT INTO users (username,password)\
                        VALUES(?,?)', [ID,PW])
                    resolve(1);
                }
            }
        );
    });
    
};
    
    


// 로그인 자격 확인
async function checkCredentials(ID, PW) {
    //Promise 키워드 정보 추가 조사 필요.
    return new Promise((resolve, reject) => {
        console.log(ID, PW);
        connection.query('SELECT 1,id FROM users WHERE userID = ? AND userPW = ?', [ID, PW],
            (error, results, fields) => {
                if (error) {
                    console.error('쿼리 실행 오류:', error);
                    return reject(error);
                }//length 를 넣지 않으면 0일때 코드 오류 발생해서 일단 가볍게 이걸로 넣어둠.
                if (results.length > 0 && results[0]['1'] == 1) {
                    console.log("Success");
                    sessionToken.push(results[0]['id']);
                    resolve([1,results[0]['id']]);
                } else {
                    console.log("Fail");
                    resolve([0]);
                }
            }
        );
    });


}



module.exports = { accessMain };

// 클라이언트 요청 처리
async function accessMain (functionType, ID, PW, Token) {

    if (functionType == 0) { // 로그인 처리
        
        result = await checkCredentials(ID,PW)
        return result;

    } else if (functionType == 1) { // 회원가입 처리
        
        result = await registerUser(ID,PW)
        return result;

    } else if (functionType == 2) { // 데이터 확인 처리

        connection.query('SELECT * FROM users', (error, results, fields) => {
            if (error) {
              console.error('쿼리 실행 실패:', error.stack);
              return 500;
            }
            console.log(results);
    } 
)   }else if (functionType == 5) { // 유저 세션 삭제 
    // 현재 server.js 에 sessionToken 이 존재함. 데이터가 동적으로
    // 불러와 지지 않는다면, 실행 오류 발생할 수 있음.
	console.log(Token);
        for(var i=0;i < sessionToken.length;i++){
        	if(sessionToken[i] == Token){
        		console.log("DELETE");
        		sessionToken.splice(i,1);
        		i--;
        		}
        }
        console.log(sessionToken);
        
};  

}
