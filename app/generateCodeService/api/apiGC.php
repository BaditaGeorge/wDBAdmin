<?php
    include_once('../models/modelGC.php');
    $endpoint = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'POST'){
        $body=json_decode(file_get_contents('php://input'),true);
        $data = $body["data"];
        
        // $usid = explode('=',$_COOKIE['logat']);
        // $usid2 = (int)$usid[1];

        $usid=$body["id"];
        header('Content-type: application/json');
        if($body["language"]==="PHP")
           echo json_encode(["response"=>generateCodePHP($data,$usid)]);
        else if($body["language"]==="Java")
           echo json_encode(["response"=>generateCodeJava($data,$usid)]);
    }
?>