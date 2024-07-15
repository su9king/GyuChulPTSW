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
        const userID = query["userID"];
        return new Promise((resolve,reject) => {
            connection.query(`SELECT org.groupName, usg.permission 
                              FROM organizations AS org 
                              JOIN user_groups AS usg ON org.groupID = usg.groupID
                              WHERE org.groupID = ? AND usg.userID = ?`
                , [groupID,userID],
                (error, results, fields) => {
                    console.log(results)
                    resolve(results);
                }
            )
        })
       
    } else if(functionType == 3){ 
        const userID = query["userID"];
        return new Promise((resolve,reject) => {
            connection.query(`SELECT * FROM inviteGroup WHERE userID = ?`
                , [userID],
                (error, results, fields) => {
                    console.log("3번요청")
                    console.log(results);
                    resolve(results);
                }
            )
        })
       
    }else if (functionType == 4) {
        const groupID = query["groupCode"];
        const userID = query["userID"];
        return new Promise((resolve, reject) => {
            connection.query(
                `SELECT groupID FROM organizations WHERE groupID = ?`, // (3) 올바른 코드를 가져왔나?
                [groupID],
                (error, results, fields) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (results != null) {  // (3) 존재하는 groupID를 들고왔구나
                            connection.query(
                                `SELECT userID,groupID FROM user_groups WHERE userID = ? and groupID = ?`,  // (2) 이미 가입된건 아닌가?
                                [userID, groupID],
                                (error, results, fields) => {
                                    console.log(results.length);
                                    if (error) {
                                        reject(error);
                                    } else if (results.length == 0) {  // (2) 아니네 아직 가입 안되었구나
                                        connection.query(
                                            `INSERT INTO user_groups (userID,groupID,permission) VALUES( ?,?,? )`,  // (1) 그럼 추가해줄게!
                                            [userID, groupID, 0],
                                            (error, results, fields) => {
                                                if (error) {
                                                    reject(error);
                                                } else {
                                                    resolve(1);  // (1) 추가해줬다!
                                                }
                                            }
                                        );
                                    } else if (results != null) {
                                        resolve(2);  // 이미 있는데 왜 또
                                    }
                                }
                            )
                            
                        } else {
                            resolve(3);  // (3) 이상한 코드 컷
                        }
                    }
                })})
    }else if(functionType == 5){ 
        const userID = query["userID"];
        return new Promise((resolve,reject) => {
            connection.query(`SELECT * FROM inviteGroup WHERE userID = ?`
                , [userID],
                (error, results, fields) => {
                    console.log("3번요청")
                    console.log(results);
                    resolve(results);
                    }
                )
            })
                   
    }
                
}