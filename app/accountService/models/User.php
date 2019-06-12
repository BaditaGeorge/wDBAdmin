<?php

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

function login($username,$password){
    GLOBAL $conn;
    $loginStmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND parola = ?");
    $loginStmt -> bind_param('ss',$username,$password);
    $loginStmt -> execute();
    $result = $loginStmt -> get_result();
    $loginStmt -> close();
    $str = '1234567890abcdefghijklmnoprstqwxyzABCDEFGHIJKLMNOPRSTQWXYZ$';
    //$str = 'abcdefghijklmnoprqstwzyz';
    $randStr = '';
    $length = strlen($str);
    $length = $length - 1;
    for($i =0 ; $i < 9; $i ++){
        $randStr .= $str[rand(0,$length)];
    }
    $usid = 0;
    $selStmt = $conn -> prepare("SELECT id FROM users WHERE email = ? AND parola = ?");
    $selStmt -> bind_param('ss',$username,$password);
    $selStmt -> execute();
    $selStmt -> store_result();
    $selStmt -> bind_result($usid);
    $selStmt -> fetch();
    $selStmt -> close();
    $randStr .= '=';
    $randStr .= strval($usid);
    $upStmt = $conn->prepare("UPDATE users SET secret = ? WHERE email = ? AND parola = ?");
    $upStmt -> bind_param('sss',$randStr,$username,$password);
    $upStmt -> execute();
    $upStmt -> close();
    $cookie_name = "logat";
    $cookie_value = $randStr;
    setcookie($cookie_name,$cookie_value,time()+3600,"/");
    if($result->num_rows === 1){
        $firstR = $result -> fetch_assoc();
        return new User($firstR['id'],$firstR['email'],$firstR['parola']);
    }
    return NULL;
}
function getData($msg){
    GLOBAL $conn;
    $loginStmt = $conn->prepare("SELECT * FROM users WHERE secret = ?");
    $loginStmt -> bind_param('s',$msg);
    $loginStmt -> execute();
    $result = $loginStmt -> get_result();
    $loginStmt -> close();
    if($result->num_rows === 1){
        $firstR = $result -> fetch_assoc();
        return new User($firstR['id'],$firstR['email'],$firstR['parola']);
    }
    return NULL;
}
function insertData($email,$password){
    GLOBAL $conn;
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
}
function check($msg){
    GLOBAL $conn;
    $loginStmt = $conn->prepare("SELECT * FROM users WHERE secret = ?");
    $loginStmt -> bind_param('s',$msg);
    $result = $loginStmt -> get_result();
    $loginStmt -> close();
    if($result->num_rows === 1){
        return TRUE;
    }
    return FALSE;
}
function logout($val){
    GLOBAL $conn;
    unset($_COOKIE['logat']);
    setcookie("logat",null,time()-3600,"/");
    $upStmt = $conn->prepare("UPDATE users SET secret = ? WHERE email = ? AND parola = ?");
    $randStr = '';
    $usr = getData($val);
    $upStmt -> bind_param('sss',$randStr,$usr->email,$usr->pass);
    $upStmt -> execute();
    $upStmt -> close();
}
function register($email,$password){
    GLOBAL $conn;
    $loginStmt = $conn->prepare("SELECT email FROM users");
    $loginStmt -> execute();
    $result = $loginStmt -> get_result();
    $loginStmt -> close();
    $oK=1;
    if($result->num_rows>0){
        while($row=$result->fetch_assoc()){
            if($row['email'] === $email){
                $oK=0;
                break;
            }
        }
        if($oK === 1){
            insertData($email,$password);
            header('Location: ../../views/html/desktopLogin.php');
        }
    }
    else{
        insertData($email,$password);
        header('Location: ../../views/html/desktopLogin.php');
    }
}
function recoverPass($email){
    GLOBAL $conn;
    $loginStmt = $conn->prepare("SELECT parola FROM users WHERE email = ?");
    $loginStmt -> bind_param("s",$email);
    $loginStmt -> execute();
    $result = $loginStmt -> get_result();
    $loginStmt -> close();
    if($result->num_rows > 0){
        echo 'Trimis!';
        $row=$result->fetch_assoc();
        $value=$row['parola'];
        $message="You wanted to recover you pass!Your pass is:".$value;
        mail($email,"DBAdmin",$message);
    }
}
function changePassword($newPassword){
    GLOBAL $conn;
    $stmt = $conn->prepare("UPDATE users SET parola = ? WHERE secret = ?");
    $stmt -> bind_param("ss",$newPassword,$_COOKIE['logat']);
    $stmt -> execute();
    $stmt -> close();
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
class User{
    public $id;
    public $email;
    public $pass;
    function __construct($id,$email,$pass){
        $this->id=$id;
        $this->email=$email;
        $this->pass=$pass;
    }
}
/*class User
{
    public $name;
    
}*/


?>