const connection = require('./DB');

module.exports = { createGroupOrder };

async function createGroupOrder(data){

    const sportType = data.sportType;
    const userID = data.userID;
    const groupName = data.groupName;
    const createdDate = data.createdDate;
    const introduction = data.introduction;
    

    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO organizations (groupName, publisherID ,sportType,introduction,createdDate) VALUES (?, ?, ?, ?, ?)`,
            [groupName, userID ,sportType,introduction,createdDate],
            (err, result) => {
                if (err) {
                    console.error('첫번째 쿼리 실행 오류:', err);
                    return reject(err);
                }
                const groupID = result.insertId;
                //방금 만들어진 조직에 대해 유저-조직 관계 테이블 데이터 추가
                connection.query(
                    `INSERT INTO user_groups (userID, groupID ,permission) VALUES (?, ?, 2)`,
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
    });
  }


