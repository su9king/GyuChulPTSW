const express = require('express');
const connection = require('./DB');


module.exports = { mainPageOrder };

async function mainPageOrder(functionType,Token) {

    if (functionType == 1){ //조직 노출을 위한 사용자가 속한 조직 데이터 제공
    	console.log(Token);
        connection.query('SELECT groupID FROM user_groups WHERE userID = ?', [Token],
            (error, results, fields) => {
                console.log(results)
                return results
        

    })} else if (functionType == 2){
        //조직 참가를 위한 데이터 제공 or 서버에서 해야할 일.
    }
}
