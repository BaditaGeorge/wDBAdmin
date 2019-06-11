<?php
    include_once('../models/modelGC.php');
    $endpoint = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];

    if($method === 'GET'){
        $data = file_get_contents('php://input');
        //$usid = explode($_COOKIE['logat'],'=');
        //$usid2 = (int)$usid[1];
        $usid = 12;
        echo generateCodePHP($data,$usid);
    }
?>