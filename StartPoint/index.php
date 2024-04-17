<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $functionType = $_POST['functionType'];
    

    switch($functionType){

        case 0: // 로그인 처리

            $ID = $_POST['ID'];
            $PW = $_POST['PW'];
            echo $ID,$PW;
            
    }
            
        
        
    


}
    
?>