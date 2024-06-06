const xlsx = require('xlsx');
const JSZip = require('jszip');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // HTTP 요청에 반응하는 express 애플리케이션 생성
app.use(bodyParser.json()); // json 형식을 파싱
app.use(bodyParser.urlencoded({ extended: true })); // url-encoded 형식을 파싱

const port = 3000;

// 회원가입 함수
function registerUser(mainFirstSheet, ID, PW) {
    //데이터베이스의 Excel파일을 로드해서 스프레드시트 객체 생성
    //그 객체의 워크시트를 새로운 변수에 저장해서 객체로 활용
    const workbook = xlsx.readFile('DataBox/DataTable.xlsx'); // 엑셀 파일 읽어오기
    
    // 첫 번째 시트의 데이터 범위를 얻기
    const range = xlsx.utils.decode_range(mainFirstSheet['!ref']);
    const highestRow = range.e.r; // e.r은 end row를 의미
    
    
    // 이미 존재하는 ID인지 검사
    for (let row = range.s.r; row <= highestRow; row++) {
        const cellAddress = { c: 0, r: row }; // ID가 있는 열 (A열)
        const cellRef = xlsx.utils.encode_cell(cellAddress); // 좌표를 문자열로 ex) A2
        const cell = mainFirstSheet[cellRef];
        

        if (cell && cell.v == ID) {
            console.log("DB와 비교")
            return 1; // 이미 존재하는 ID
        }
    }
    
    console.log("존재하지 않는 것 확인")
    // 새로운 정보 추가
    // ID 저장
    const newIdCellAddress = { c: 0, r: highestRow + 1 };
    const newIdCellRef = xlsx.utils.encode_cell(newIdCellAddress);
    mainFirstSheet[newIdCellRef] = { v: ID };

    // PW 저장
    const newPwCellAddress = { c: 1, r: highestRow + 1 };
    const newPwCellRef = xlsx.utils.encode_cell(newPwCellAddress);
    mainFirstSheet[newPwCellRef] = { v: PW };

    // 데이터 범위 업데이트
    mainFirstSheet['!ref'] = xlsx.utils.encode_range({
        s: range.s,
        e: { c: range.e.c, r: highestRow + 1 }
    });

    xlsx.writeFile(workbook, 'DataBox/DataTable.xlsx');

    return 0; // 회원가입 성공
    }

// 공유 문자열 추출 함수
async function extractSharedStrings(zipFilePath) {
    const data = fs.readFileSync(zipFilePath);
    const zip = await JSZip.loadAsync(data);
    const sharedStringsXML = await zip.file('xl/sharedStrings.xml').async('string'); // 여기서 xml파일을 불러오지 못했음
    const sharedStringsDoc = xlsx.read(sharedStringsXML, { type: 'string' });

    const sharedStrings = [];
    const sharedStringsSheet = sharedStringsDoc.Sheets[sharedStringsDoc.SheetNames[0]];
    const range = xlsx.utils.decode_range(sharedStringsSheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        const cellAddress = { c: 0, r: row }; // 일반적으로 1열에서 끝남, 만약 회원 많아지면 for문 추가
        const cellRef = xlsx.utils.encode_cell(cellAddress);
        const cell = sharedStringsSheet[cellRef];
        if (cell) {
            sharedStrings.push(cell.v);
        }
    }

    return sharedStrings;
}


// 로그인 자격 확인
async function checkCredentials(mainFirstSheet, ID, PW, sharedStrings) {
    // 시트 데이터 범위 얻기
    const range = xlsx.utils.decode_range(mainFirstSheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        // 각 행의 첫 번째 셀(ID)과 두 번째 셀(PW) 값을 담을 변수
        let rowID = null;
        let rowPW = null;

        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = { c: col, r: row };
            const cellRef = xlsx.utils.encode_cell(cellAddress);
            const cell = mainFirstSheet[cellRef];
            
            if (!cell) continue; // cell이 비어있지 않으면 계속 진행

            let cellValue = cell.v; // cell의 value(값)을 저장
            const cellType = cell.t; // cell의 type을 저장

            // 공유 문자열 타입일 경우, 실제 값을 가져옵니다.
            if (cellType === 's' && sharedStrings[cellValue]) { // 공유 문자열 타입 s라면, 
                cellValue = sharedStrings[cellValue];
            }

            // 첫 번째 열(A)은 ID로, 두 번째 열(B)는 PW로 간주합니다.
            if (col === 0) {
                rowID = cellValue;
            } else if (col === 1) {
                rowPW = cellValue;
            }
        }

        // ID와 PW가 모두 일치하는지 확인합니다.
        if (rowID === ID && rowPW === PW) {
            return true;
        }
    }

    return false;
}


module.exports = { executeMain };

// 클라이언트 요청 처리
async function executeMain (functionType, ID, PW) {
//app.post('index.js', async (req, res) => { // 비동기로 /api로 들어오는 post요청 처리
    console.log("성공");
    //const { functionType, ID, PW } = req.body; // request, response
    const zipFilePath = 'DataBox/DataTable.xlsx';

    const workbook = xlsx.readFile(zipFilePath);
    const mainFirstSheetName = workbook.SheetNames[0];
    const mainFirstSheet = workbook.Sheets[mainFirstSheetName];

    if (functionType == 0) { // 로그인 처리
        const sharedStrings = await extractSharedStrings(zipFilePath); // 여기서 extractSharedStrings 함수가 못 돌아서 끊김
        const isValid = await checkCredentials(mainFirstSheet, ID, PW, sharedStrings);
        res.send(isValid ? "1" : "0"); // true(성공) -> 1, false(실패) -> 0


    } else if (functionType == 1) { // 회원가입 처리
        console.log("회원가입처리")
        const result = registerUser(mainFirstSheet, ID, PW);
        console.log(result.toString());
        return result.toString();


    } else if (functionType == 2) { // 데이터 확인 처리
        const dataList = []; // 데이터를 저장할 리스트 초기화
        const range = xlsx.utils.decode_range(mainFirstSheet['!ref']);
        const highestRow = range.e.r; // 가장 마지막 데이터 행을 찾습니다.
        const rowsToRead = Math.min(highestRow, 10); // 최대 10개의 행을 읽거나, 최대 행 수까지 읽습니다.

        for (let row = 0; row < rowsToRead; row++) {
            const idCellRef = xlsx.utils.encode_cell({ c: 0, r: row });
            const pwCellRef = xlsx.utils.encode_cell({ c: 1, r: row });
            const ID = mainFirstSheet[idCellRef]?.v; // undefined or value
            const PW = mainFirstSheet[pwCellRef]?.v; // undefined or value
            dataList.push([ID, PW]);
        }

        res.json(dataList); // 데이터 리스트를 JSON 형식으로 변환하여 출력합니다.
    }
};

