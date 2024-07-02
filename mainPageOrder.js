module.exports = { mainPageOrder };

async function mainPageOrder(functionType,Token) {

    if (functionType == 1){ //조직 노출을 위한 사용자가 속한 조직 데이터 제공
        connection.query('SELECT groupID FROM organizations WHERE username = ?', [Token],
            (error, results, fields) => {
                console.log(results)

    }
)
}
}