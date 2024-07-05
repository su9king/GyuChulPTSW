const express = require('express');
const connection = require('./DB');


module.exports = { mainPageOrder };

async function mainPageOrder(functionType,Token) {

    if (functionType == 1){ //조직 노출을 위한 사용자가 속한 조직 데이터 제공

        return new Promise((resolve,reject) => {
            connection.query('SELECT groupID FROM user_groups WHERE userID = ?', [Token],
                (error, results, fields) => {
                    console.log(results)
                    resolve(results);
                }
            )
        })
    }else if(functionType == 2){
        console.log("TEST");
    }
}
