<?php
$method = $_SERVER['REQUEST_METHOD'];

if($method === 'GET'){
    $data = file_get_contents('baza2.txt');
    echo $data;
}
?>