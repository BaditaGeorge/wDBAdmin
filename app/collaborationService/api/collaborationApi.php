<?php
include_once('../models/accountModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];

if($method=='PUT'){

    if($endpoint==='collaborationApi/newColab')
    {
        $requestBodyAsString = json_decode(file_get_contents('php://input'),TRUE);
        $partners=$requestBodyAsString['partners'];
        

    }
    else
    {
        header('Content-type: application/json');
        echo json_encode(['reason'=>'Bad request']);
        http_response_code(400);
    }

}


?>