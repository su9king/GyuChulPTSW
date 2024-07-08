const connection = require('./DB');


async function newPosts(title, content,groupID) {
    return new Promise((resolve, reject) => {
        connection.query(
            `INSERT INTO posts (title, content,groupID) VALUES (?, ?, ?)`,
            [title, content,groupID],
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

async function getAllPosts(groupID) {
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

module.exports = { postsOrder };

async function postsOrder(data) {
  const functionType = data.functionType;
  const groupID = data.groupID;

  if (functionType == 1) {
    getAllPosts(groupID);
  }
  else {
    const title = data.title;
    const content = data.title;
    newPosts(title, content, groupID);
  }

}