<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" type="text/css" href="../css/desktopRegister.css">
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
                        <h4>REGISTER HERE</h4>
                    <input type="email" id="email" name="email" placeholder="E-mail*" required>

                    <input type="text" id="usernameID" placeholder="Username*" required>

                    <input type="password" id="loginPassword" name="loginPass" placeholder="Password*" required>

                    <button type="submit" id="buttonLogin" name="submit" value="REGISTER"></button>
                
                        <footer class="register">
                                <a href="desktopLogin.php">Already a member?</a>
                            </footer>
                </form>
            </div>
        </div>
   
    
</body>
</html>