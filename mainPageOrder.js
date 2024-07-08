const express = require('express');
const connection = require('./DB');


module.exports = { mainPageOrder };
async function mainPageOrder(query) {

    const functionType = query["functionType"];

    if (functionType == 1){ //조직 노출을 위한 사용자가 속한 조직 데이터 제공
        const userID = query["userID"];
        return new Promise((resolve,reject) => {
            connection.query(`SELECT ug.groupID, ug.permission, og.groupName FROM user_groups as ug , organizations as og WHERE userID = ? and og.groupID = ug.groupID;`, [userID],
                (error, results, fields) => {
                    console.log(results)
                    resolve(results);
                }
            )
        })
    } else if(functionType == 2){
        const groupID = query["groupID"];
        return new Promise((resolve,reject) => {
            connection.query('SELECT postID,title,content FROM posts WHERE groupID = ?', [groupID],
                (error, results, fields) => {
                    console.log(results)
                    resolve(results);
                }
            )
        })
       
    }
}
