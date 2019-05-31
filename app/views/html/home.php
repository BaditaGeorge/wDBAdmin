<?php

include_once 'User.php';

if(isset($_POST['submit'])){
    if($_POST['submit'] === 'REGISTER'){

    }
    if($_POST['submit'] === 'LOGIN'){
        $user=login($_POST['email'],$_POST['loginPass']);
        if($user !== NULL){
            echo '<p>Gud</p>';
            //header('Location: ../../views/html/desktopMainPage.html');
        }
        else{
            echo '<p>Nada</p>';
        }
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