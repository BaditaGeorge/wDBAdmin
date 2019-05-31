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
    if($result->num_rows === 1){
        $firstR = $result -> fetch_assoc();
        return new User($firstR['id'],$firstR['email'],$firstR['parola']);
    }
    return NULL;
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