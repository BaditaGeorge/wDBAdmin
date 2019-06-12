<?php

require_once('PHPMailer/src/PHPMailer.php');
require_once('PHPMailer/src/SMTP.php');
require_once('PHPMailer/src/Exception.php');
include_once('app/accountService/models/User.php');

$CONFIG=[
    'servername' => "localhost",
    'username' => "root",
    'password' => '',
    'db' => 'proiectacc'
];
$conn = new mysqli($CONFIG["servername"],$CONFIG["username"],$CONFIG["password"],$CONFIG["db"]);
if($conn->connect_error){
    die("Connection failed:".$conn->connect_error);
}
$CONF=[
    'servername' => "localhost",
    'username' => "root",
    'password' => '',
    'db' => 'collaborate'
];
$conn2 = new mysqli($CONF["servername"],$CONF["username"],$CONF["password"],$CONF["db"]);
if($conn2->connect_error){
    die("Connection failed:".$conn2->connect_error);
}
function getByMail($mail){
    GLOBAL $conn;
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt -> bind_param("s",$mail);
    $stmt -> execute();
    $result = $stmt -> get_result();
    $stmt -> close();
    if($result->num_rows > 0){
        $row = $result->fetch_assoc();
        $value = $row['id'];
        return $value;
    }
    return -1;
}
function insertDb($idSh,$mailsSh,$dbN){
    GLOBAL $conn2;
    $arr = explode(',',$mailsSh);
    // $url = 'app/accountService/api/gmApi.php';
    // $ch = curl_init($url);
    // $headers = array(
    //     'Content-Type:application/json',
    //     'Accept: application/json'
    // );
    $arr2 = explode('/',$idSh);
    $nr = count($arr2)-1;
    $rdbn = $arr2[$nr].'_'.$dbN;
    $result = '';
    $r = 1;
    $ar = 'ana';
    $stmt = $conn2->prepare("INSERT INTO userscolab(id,database_name) VALUES(?,?)");
    for($i=0;$i<count($arr);$i++){
        // $data = ["mail"=>$arr[$i]];
        // curl_setopt($ch,CURLOPT_CUSTOMREQUEST,'POST');
        // curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));
        // curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
        //$result .= (string)getByMail($arr[$i]);
        //file_put_contents('a.txt',$arr[$i]);
        /*
             $loginStmt = $conn->prepare("INSERT INTO users(id,email,parola) VALUES(?,?,?)");
            $stid = $conn->prepare("SELECT MAX(id) FROM users");
            $random_v = 0;
            $stid->execute();
            $stid->store_result();
            $stid->bind_result($random_v);
            $stid->fetch();
            $stid->close();
            $loginStmt -> bind_param("sss",$random_v,$email,$password);
            $loginStmt -> execute();
            $loginStmt -> close();
        */
        $idd = (string)getByMail($arr[$i]);
        $stmt -> bind_param("ss",$idd,$rdbn);
        $stmt -> execute();
    }
    $stmt -> close();
    $stid = $conn2->prepare("INSERT INTO contcolab(database_name,db_content) VALUES(?,?)");
    $cont = '';
    $stid->bind_param("ss",$rdbn,$cont);
    $stid->execute();
    // curl_close($ch);
    // //$result .= $idSh;
    //file_put_contents('out.txt',$result);
}
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