<?php
include_once('../models/User.php');
$method = $_SERVER['REQUEST_METHOD'];
if($method === 'POST'){
    $arr = json_decode(file_get_contents('php://input'),true);
    $val = 'Acceseaza link-ul pentru a colabora cu utilizatorul X : http://localhost/app/views/html/desktopMainPage.html';
    sendMail($arr['a'],$val);
}
?>