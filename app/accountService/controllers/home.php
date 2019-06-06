<?php

include_once '../models/User.php';

if(isset($_POST['submit'])){
    if($_POST['submit'] === 'REGISTER'){
        register($_POST['email'],$_POST['loginPass']);
    }
    if($_POST['submit'] === 'LOGIN'){
        $user=login($_POST['email'],$_POST['loginPass']);
        if($user !== NULL){
            header('Location: ../../views/html/desktopMainPage.html');
            /*$cookie_name = "logat";
            $cookie_value = $user->email.' '.$user->id;
            setcookie($cookie_name,$cookie_value,time()+3600,"/");*/
        }
        else{
            echo '<p>Nada</p>';
        }
    }
    if($_POST['submit'] === 'RECOVER'){
        recoverPass($_POST['email']);
    }
    /*if($_POST['submit'] === 'LOGOUT'){
        setcookie("logat","",time()-3600);
    }*/
}
if(isset($_GET['submit'])){
    logout($_COOKIE['logat']);
    header('Location: ../../views/html/desktopLogin.php');
}
if(isset($_POST['buttonCP'])){
    if($_POST['newPass'] === $_POST['confirmNewPass']){
        changePassword($_POST['newPass']);
        header('Location: ../../views/html/desktopMainPage.html');
    }
}
/*class Home extends Controller
{
    public function index($name = '')
    {
       $user = $this->model('User'); 
       $user->name = $name;

       $this->view('home/index', ['name' => $user->name ] );
       
    }
}*/

?>