<?php

$fileName = 'DataTable.xlsx';
$zip = new ZipArchive;
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();

use PhpOffice\PhpSpreadsheet\IOFactory;

$fileName = 'DataTable.xlsx';

// 회원가입 처리 함수
function registerUser($fileName, $ID, $PW) {
    $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($fileName);
    $worksheet = $spreadsheet->getActiveSheet();
    
    $highestRow = $worksheet->getHighestRow(); // 가장 마지막 데이터 행을 찾습니다.
    
    // 이미 존재하는 ID인지 검사
    for ($row = 1; $row <= $highestRow; $row++) {
        if ($worksheet->getCellByColumnAndRow(1, $row)->getValue() === $ID) {
            return 1; // 이미 존재하는 ID인 경우 1을 반환
        }
    }
    
    // 새로운 사용자 정보를 추가
    $worksheet->getCellByColumnAndRow(1, $highestRow + 1)->setValue($ID);
    $worksheet->getCellByColumnAndRow(2, $highestRow + 1)->setValue($PW);
    
    $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
    $writer->save($fileName);
    
    return 0; // 성공적으로 추가된 경우 0을 반환
}
function checkCredentials($zip, $ID, $PW) {
    if (($index = $zip->locateName('xl/worksheets/sheet1.xml')) !== false) {
        $data = $zip->getFromIndex($index);
        $xml = simplexml_load_string($data);
        $namespaces = $xml->getNamespaces(true);

        // 공유 문자열이 있을 경우를 대비해 미리 불러옵니다.
        $sharedStrings = [];
        if (($index = $zip->locateName('xl/sharedStrings.xml')) !== false) {
            $stringsXml = simplexml_load_string($zip->getFromIndex($index));
            foreach ($stringsXml->si as $si) {
                $sharedStrings[] = (string)$si->t;
            }
        }

        foreach ($xml->sheetData->row as $row) {
            // 각 행의 첫 번째 셀(ID)과 두 번째 셀(PW) 값을 담을 변수
            $rowID = $rowPW = null;

            foreach ($row->c as $c) {
                $cellRef = (string)$c->attributes()->r;
                $cellValue = (string)$c->v;
                $cellType = (string)$c->attributes()->t;

                // 공유 문자열 타입일 경우, 실제 값을 가져옵니다.
                if ($cellType == 's' && isset($sharedStrings[$cellValue])) {
                    $cellValue = $sharedStrings[$cellValue];
                }

                // 첫 번째 열(A)는 ID로, 두 번째 열(B)는 PW로 간주합니다.
                if (preg_match('/^A\d+$/', $cellRef)) {
                    $rowID = $cellValue;
                } elseif (preg_match('/^B\d+$/', $cellRef)) {
                    $rowPW = $cellValue;
                }
            }

            // ID와 PW가 모두 일치하는지 확인합니다.
            if ($rowID === $ID && $rowPW === $PW) {
                return true;
            }
        }
    }
    return false;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $functionType = $_POST['functionType'];

    if ($functionType == 0) { // 로그인 처리
        $ID = $_POST['ID'];
        $PW = $_POST['PW'];

        if ($zip->open($fileName) === TRUE) {
            if (checkCredentials($zip, $ID, $PW)) {
                echo "1"; // 로그인 성공
            } else {
                echo "0"; // 로그인 실패
            }
            $zip->close();
        } else {
            echo "0"; // 파일을 열 수 없는 경우도 실패로 처리
        }
    }elseif($functionType == 1) { //회원가입 처리
        $ID = $_POST['ID'];
        $PW = $_POST['PW'];

        $result = registerUser($fileName, $ID, $PW);
        echo $result; // 결과 반환
        
    }elseif ($functionType == 2) { // 데이터 확인 처리
        $dataList = []; // 데이터를 저장할 리스트 초기화
    
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($fileName);
        $worksheet = $spreadsheet->getActiveSheet();
    
        $highestRow = $worksheet->getHighestRow(); // 가장 마지막 데이터 행을 찾습니다.
        $rowsToRead = min($highestRow, 10); // 최대 10개의 행을 읽거나, 최대 행 수까지 읽습니다.
    
        for ($row = 1; $row <= $rowsToRead; $row++) {
            $ID = $worksheet->getCellByColumnAndRow(1, $row)->getValue();
            $PW = $worksheet->getCellByColumnAndRow(2, $row)->getValue();
            $dataList[] = [$ID, $PW]; // ID와 PW를 리스트에 추가합니다.
        }
    
        echo json_encode($dataList); // 데이터 리스트를 JSON 형식으로 변환하여 출력합니다.
    }
    
}
?>
