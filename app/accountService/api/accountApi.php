<?php
include_once('../models/accountModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];


if($method==='GET')
{
    preg_match('/^\/accountApi\/getId\/(.+)$/', $endpoint, $matches);
    
    if($matches)
    {
        $id=getId($matches[1]);

        if($id!=null)
        {
            header('Content-type: application/json');
            echo json_encode(['id'=>$id]);
        }
    }
}


?>