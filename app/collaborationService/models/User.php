<?php

require_once('PHPMailer/src/PHPMailer.php');
require_once('PHPMailer/src/SMTP.php');
require_once('PHPMailer/src/Exception.php');
function sendMail($adr,$bd){
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = '465';
    $mail->isHTML();
    $mail->Username = 'georgedbatw@gmail.com';
    $mail->Password = 'kikimashina12';
    $mail->SetFrom('no-reply@DbAdmin.org');
    $mail->Subject = 'Test';
    $mail->Body = $bd;
    $mail->AddAddress($adr);
    $mail->Send();
}
class User
{
    public $name;
    
}


?>