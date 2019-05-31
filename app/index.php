<?php
    if(!isset($_COOKIE['logat']))
    {
        header('Location: views/html/desktopLogin.html');
    }
    else{
        header('Location: views/html/desktopMainPage.html');
    }
?>