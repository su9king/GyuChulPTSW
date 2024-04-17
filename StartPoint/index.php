<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo 'test';

    if(isset($_POST['functionType'])) {
        $functionType = $_POST['functionType'];
    switch($functionType){

        case 0: // 로그인 처리
            $ID = '신민철';
            $PW = 123456;
        
            $url = 'https://script.google.com/macros/s/AKfycbxQd2icWia-wNArwlHF_GMD-slXnYg0FQZv8s_7Tyyym2-0XKd6Kj9145iCuUFLML1o/exec'; // Google Apps Script 웹앱 URL
        
            // 요청할 데이터
            $postData = array(
                'function' => 'login', // Apps Script에서 이 값을 기반으로 적절한 함수를 호출할 수 있습니다.
                'ID' => $ID,
                'PW' => $PW
            );
        
            // cURL을 사용하여 POST 요청을 보냅니다.
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 개발 중이라면, SSL 검증을 생략합니다.
        
            $response = curl_exec($ch);
            curl_close($ch);
        
            // 응답 처리
            if ($response) {
                $response = json_decode($response, true); // JSON 응답을 배열로 변환
                if($response['result'] == 1){
                    echo '<script>';
                    echo 'console.log($response["result"])';
                    echo '</script>';
                }
                // 여기서 응답에 따른 로직을 구현합니다.
                // 예: if($response['result'] == 'success') { ... }
            } else {
                echo '<script>';
                echo 'console.log($response["result"])';
                echo '</script>';
                // 요청 실패 처리
            }
            break;
        



    }

        
        }
    } else {
        echo "functionType is missing";
    
}
?>