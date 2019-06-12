<?php
$method = $_SERVER['REQUEST_METHOD'];

if($method === 'POST'){
    $arrp = json_decode(file_get_contents('php://input'),true);
    $all = explode('/',$arrp['b']);
    $nrum = count($all)-1;
    $vil = $all[$nrum].'_'.$arrp['a'];
    $vil .= '.txt';
    $data = file_get_contents($vil);
    echo $data;
}
?>