const express = require('express');
const connection = require('./DB');


module.exports = { mainPageOrder };

async function mainPageOrder(query) {

    const fuctionType = query["functionType"];

    if (functionType == 1){ //조직 노출을 위한 사용자가 속한 조직 데이터 제공
        const Token = query["user"];
        return new Promise((resolve,reject) => {
            connection.query('SELECT ug.groupID, ug.permission, og.groupName FROM user_groups as ug , organizations as og WHERE userID = ?;', [Token],
                (error, results, fields) => {
                    console.log(results)
                    resolve(results);
                }
            )
        })
    }else if(functionType == 2){
        const groupID = query["groupID"];
        return(groupID,"아직 정해진 로직이 없습니다.")
    }
}
