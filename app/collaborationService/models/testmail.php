<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php
    require_once('PHPMailer/src/PHPMailer.php');
    require_once('PHPMailer/src/SMTP.php');
    require_once('PHPMailer/src/Exception.php');
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
    $mail->Body = 'E un mail de test!';
    $mail->AddAddress('geoey567@gmail.com');
    $mail->Send();
?>
</body>
</html>