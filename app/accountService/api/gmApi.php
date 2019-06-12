<?php
include_once('../models/accountModel.php');

$endpoint=$_SERVER['REQUEST_URI'];
$method=$_SERVER['REQUEST_METHOD'];


if($method==='POST')
{
    $val = json_decode(file_get_contents('php://input'));
    file_put_contents('out.txt','ajus');
    echo getByMail($val['mail']);
}


?>