<?php
include_once('../models/databaseFunctionsModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];

if($method=='POST'){

    preg_match('/^\/databaseFunctionsApi\/newId\/(.+)$/', $endpoint, $matches);
    
   
    if($matches)
    {   
        //createNewStorage($matches[1]);
     
    }
    else
    {
        header('Content-type: application/json');
        echo json_encode(['reason'=>'Bad request']);
        http_response_code(400);
    }
    
}





?>