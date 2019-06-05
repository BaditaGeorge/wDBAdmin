<?php
    $endpoint = $_SERVER['REQUEST_URI'];
    if($endpoint === '/detest.php' && $_SERVER['REQUEST_METHOD'] === 'GET'){
        $data['key'] = 'valore';
        echo json_encode($data);
    }
    else{
         $data = file_get_contents('php://input');
         $jsD = json_decode($data);
         $val['key'] = $jsD->cici;
         echo json_encode($val);
    }
?>