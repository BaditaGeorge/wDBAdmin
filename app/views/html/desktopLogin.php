<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" type="text/css" href="../css/desktopLogin.css">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
        <?php
            if(isset($_COOKIE['logat'])){
                header('Location: desktopMainPage.html');
            }
        ?>
        <div class="interior">
            <div class="stanga">
                <a href="https://www.facebook.com/">
                    <img class="imgf" src="../css/facebookButton.png" alt="facebookIcon" width="50" height="50">
                </a>
            </div>
            <div class="dreapta">
                <form class="signIn" action="../../accountService/controllers/home.php" method="POST">
                        <h4>LOGIN</h4>
                        <input type="text" id="username" name="email" placeholder="Username*" required>

                        <input type="password" id="loginPass" name="loginPass" placeholder="Password*" required>

                        <button type="submit" id="buttonLogin" name="submit" value="LOGIN"></button>
                        <footer class="register">
                                <a id="reg" href="desktopRegister.html">Not a member yet?</a>
                                <a id="fpas" href="desktopEmail.html">Forgot Password?</a>
                            </footer>
                </form>
            </div>
        </div>
   
    
</body>
</html>