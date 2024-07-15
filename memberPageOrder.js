const connection = require('./DB');

module.exports = { memberPageOrder };

async function findMembers(groupID){
    return new Promise((resolve,reject) => {
        connection.query(`SELECT usr.userID as userName FROM user_groups as usrgrp
                            JOIN users as usr ON usrgrp.userID = usr.id
                            WHERE usrgrp.groupID = ?;`, [groupID],
            (error, results, fields) => {
                console.log(results)
                resolve(results);
            }
        )
    })
}

async function deleteMembers(groupID,userName,permission){

    if (permission == 0){
        return new Promise((resolve,reject) => {
                resolve(0);
            }
            )
    }else{
    
        return new Promise((resolve,reject) => {
        connection.query(
            `SELECT id FROM users WHERE userID = ?`,
            [userName],
            (err, result) => {
                if (err) {
                    console.error('첫번째 쿼리 실행 오류:', err);
                    return reject(err);
                }
                const userID = result[0]["id"];
                console.log(userID);
                //방금 만들어진 조직에 대해 유저-조직 관계 테이블 데이터 추가
                connection.query(
                    `DELETE FROM user_groups WHERE userID = ? and groupID = ?;`,
                    [userID, groupID],
                    (err, result) => {
                        if (err) {
                            console.error('두번째 쿼리 실행 오류:', err);
                            return reject(err);
                        }
                    }

                );
                resolve(1);
            }
            
        );
    })
    }
}



async function memberPageOrder(data){

    const groupID = data.groupID;
    const functionType = data.functionType;

    if (functionType == 1){
        result = await findMembers(groupID);
        return result;
    } else if (functionType == 2){
        const userName = data.userName;
        const permission = data.permission;

        result = await deleteMembers(groupID,userName,permission);
        return result;
    }
}

