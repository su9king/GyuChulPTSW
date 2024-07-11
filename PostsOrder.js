const connection = require('./DB');

module.exports = { postsOrder };

async function postsOrder(data) {
  const functionType = data.functionType;
  const groupID = data.groupID;

  if (functionType == 1) {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM posts WHERE groupID = ?`,[groupID],
         (err, results) => {
        if (err) {
          console.error('쿼리 실행 오류:', err);
          return reject(err);
        }
        resolve(results);
      });
    }); 
    
    
  }
  else if (functionType == 2) {
    const title = data.title;
    const content = data.content;
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO posts (title, content, groupID) VALUES (?, ?, ?)`,
            [title, content, groupID],
            (err, result) => {
                if (err) {
                    console.error('쿼리 실행 오류:', err);
                    return reject(err);
                }
                const newPost = { index: result. insertId, title, content };
                resolve(newPost);
            }
        );
    });
  }
  else if (functionType == 3) {
    
    const postID = data.postID;
    const permission = data.permission;

    return new Promise((resolve, reject) => {

      if (permission == 0) {

        resolve(0);  // 권한 없는데 삭제 시도
      } else {

        connection.query(`DELETE FROM posts WHERE postID = ?`,[postID],
          (err, results) => {
          if (err) {
            console.error('쿼리 실행 오류:', err);
            return reject(err);
          }
            resolve(1);
        });
      }
    }); 


  }

}